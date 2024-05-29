"use client";

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  generateMonthsUntilToday,
  generateYearsUntilToday,
  getCurrentMonthAbbreviation,
} from "@/lib/utils";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { LoadingSpinner } from "../../spinner";
import CardOwn from "../card/card";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [selectedMonth, setSelectedMonth] = useState(
    generateMonthsUntilToday()
  );
  const [oneSelectedMonth, setoneSelectedMonth] = useState(
    generateMonthsUntilToday().find((data) => data.isSelected)
  );
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState(generateYearsUntilToday());
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  useEffect(() => {
    table.getColumn("month")?.setFilterValue(getCurrentMonthAbbreviation());
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className=" w-full h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-5 justify-center">
        <CardOwn
          title={"Total Penerimaan Bulan Ini"}
          data={data}
          oneSelectedMonth={oneSelectedMonth}
          tipe={"penerimaan"}
        />
        <CardOwn
          title={"Total Pengeluaran Bulan Ini"}
          data={data}
          oneSelectedMonth={oneSelectedMonth}
          tipe={"pengeluaran"}
        />
        <CardOwn
          title={"Total Saldo Buku Kas Ini"}
          data={data}
          oneSelectedMonth={oneSelectedMonth}
          tipe={"total"}
        />
      </div>
      <div className="rounded-md border bg-white px-5 py-2">
        <div className="flex items-center py-2 justify-between gap-8">
          <div className=" w-full h-full">
            {/* FILTER TRANSAKSI */}
            <Input
              placeholder="Filter Transaksi..."
              value={
                (table.getColumn("desc")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("desc")?.setFilterValue(event.target.value)
              }
              className="max-w-sm h-8"
            />
          </div>
          <div className="w-full flex">
            <div className=" flex gap-5">
              {/* FILTER BULAN */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="h-8">
                    <Button variant="outline" className="ml-auto">
                      {selectedMonth.map((data, index) => {
                        if (data.isSelected) {
                          return `${data.month}`;
                        }
                      })}
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {selectedMonth.map((data, index) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={index}
                          className="capitalize"
                          checked={selectedMonth[index].isSelected}
                          onCheckedChange={(value: any) => {
                            setSelectedMonth((prevMonths) => {
                              // Reset all isSelected to false
                              const updatedMonths = prevMonths.map((month) => ({
                                ...month,
                                isSelected: false,
                              }));

                              // Set the isSelected of the selected month to true
                              const index2 = updatedMonths.findIndex(
                                (month) => month.id === index
                              );
                              if (index2 !== -1) {
                                updatedMonths[index2].isSelected = true;
                                table
                                  .getColumn("month")
                                  ?.setFilterValue(updatedMonths[index2].month);
                                setoneSelectedMonth(updatedMonths[index2]);
                              }
                              return updatedMonths;
                            });
                          }}
                        >
                          {data.month}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {/* FILTER TAHUN */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="h-8">
                    <Button variant="outline" className="ml-auto">
                      {selectedYear.map((data, index) => {
                        if (data.isSelected) {
                          return `${data.year}`;
                        }
                      })}
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {selectedYear.map((data, index) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={index}
                          className="capitalize"
                          checked={selectedYear[index].isSelected}
                          onCheckedChange={(value: any) => {
                            setSelectedYear((prevYears) => {
                              // Reset all isSelected to false
                              const updatedYears = prevYears.map((prev) => ({
                                ...prev,
                                isSelected: false,
                              }));

                              // Set the isSelected of the selected month to true
                              const index2 = updatedYears.findIndex(
                                (year) => year.id === index
                              );
                              if (index2 !== -1) {
                                updatedYears[index2].isSelected = true;
                                table
                                  .getColumn("year")
                                  ?.setFilterValue(
                                    updatedYears[index2].year.toString()
                                  );
                              }

                              return updatedYears;
                            });
                          }}
                        >
                          {data.year}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="w-full flex float-end">
            {/* FILTER COLUMN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="h-8">
                <Button variant="outline" className="ml-auto">
                  Filter Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    if (
                      column.id == "year" ||
                      column.id == "month" ||
                      column.id.includes("kegiatanId") ||
                      column.id.includes("_id")
                    ) {
                    } else {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value: any) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    }
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className=" rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          width: `${header.id == "desc" ? "50%" : "10%"}`,
                        }}
                        className={`${
                          header.id == ("month" || "year") ||
                          header.id == "year" ||
                          header.id.includes("kegiatanId") ||
                          header.id.includes("_id")
                            ? "hidden"
                            : ""
                        }`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          className={`px-1 py-[2px] ${
                            cell.id.includes("month") ||
                            cell.id.includes("year") ||
                            cell.id.includes("kegiatanId") ||
                            cell.id.includes("_id")
                              ? "hidden"
                              : ""
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* PAGINATION */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
