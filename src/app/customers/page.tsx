"use client";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { TextField, MenuItem, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useCustomerTable } from "@/src/store/useCustomerTable";
type Row = {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  documentId: string;
  status: "draft" | "submitted" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
};
export default function CustomersPage() {
  const { q, status, page, pageSize, setQ, setStatus, setPage, setPageSize } =
    useCustomerTable();
  const [rows, setRows] = useState<Row[]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      q,
      status,
      page: String(page + 1),
      pageSize: String(pageSize),
    });
    const res = await fetch(`/api/customers?${params.toString()}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setRows(data.items);
    setRowCount(data.total);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [q, status, page, pageSize]);
  const columns: GridColDef<Row>[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "dob",
      headerName: "DOB",
      flex: 1,
      valueGetter: (p) =>
        new Date(p.row?.dob ? p.row?.dob : null).toLocaleDateString(),
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (p) => (
        <div
          className="table-actions"
          role="group"
          aria-label={`Actions for ${p.row.name}`}
        >
          <Link href={`/customers/${p.row.id}`}>View</Link>
          {p.row.status === "draft" ? (
            <Link href={`/customers/${p.row.id}/edit`}>Edit draft</Link>
          ) : null}
        </div>
      ),
    },
  ];
  const onPaginationModelChange = (m: GridPaginationModel) => {
    setPage(m.page);
    setPageSize(m.pageSize);
  };

  console.log("COLUMNS --> ", columns, rows);
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Customers
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
        <TextField
          label="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          size="small"
        />
        <TextField
          label="Status"
          select
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          sx={{ width: 200 }}
        >
          <MenuItem value="all">All statuses</MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="submitted">Submitted</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>
        <Link href="/customers/new">
          <Button variant="contained">New Onboarding</Button>
        </Link>
      </Stack>
      <div style={{ width: "100%", height: 520 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={onPaginationModelChange}
          rowCount={rowCount}
          pageSizeOptions={[5, 10, 20, 50]}
          disableRowSelectionOnClick
          getRowId={(r) => r.id}
        />
      </div>
    </div>
  );
}
