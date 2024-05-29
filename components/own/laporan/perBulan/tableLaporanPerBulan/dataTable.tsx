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
import React, { useEffect, useState, useRef } from "react";
import {
  commafy,
  generateMonthsUntilToday,
  generateYearsUntilToday,
  getCurrentMonthAbbreviation,
} from "@/lib/utils";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { LoadingSpinner } from "../../../spinner";
import { TransactionType } from "./columnPenerimaan";

// EXPORT TO PDF OR EXCEL
import { useReactToPrint } from "react-to-print";
import { useDownloadExcel } from "react-export-table-to-excel";
import { DownloadTableExcel } from "react-export-table-to-excel";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends TransactionType, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // EXPORT PDF
  const componentPDF = useRef<HTMLInputElement>(null);
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
  const [selectedYear, setSelectedYear] = useState(generateYearsUntilToday());
  const [oneSelectedYear, setoneSelectedYear] = useState(
    generateYearsUntilToday().find((data) => data.isSelected)
  );
  const [loading, setLoading] = useState(true);
  // PENERIMAAN DAN PENGELUARAN BULAN INI
  const [penerimaanBulanIni, setpenerimaanBulanIni] = useState(0);
  const [pengeluaranBulanIni, setpengeluaranBulanIni] = useState(0);
  const [saldoAwal, setsaldoAwal] = useState(0);

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

  const getPenerimaandanPengeluaranBulanIni = () => {
    let newPenerimaanBulanIni = 0;
    let newPengeluaranBulanIni = 0;
    data.map((datas: any) => {
      let monthDatas = new Date(datas.date).getMonth();
      if (monthDatas == oneSelectedMonth?.id) {
        if (datas.tipe == "penerimaan") {
          newPenerimaanBulanIni += datas.amount;
        } else {
          newPengeluaranBulanIni += datas.amount;
        }
      }
    });
    setpenerimaanBulanIni(newPenerimaanBulanIni);
    setpengeluaranBulanIni(newPengeluaranBulanIni);
  };

  const getSaldoAwal = () => {
    let newPenerimaanSaldoAwal = 0;
    let newPengeluaranSaldoAwal = 0;
    data.map((datas: any) => {
      let monthDatas = new Date(datas.date).getMonth();
      let yearDatas = new Date(datas.date).getFullYear();
      if (oneSelectedMonth != undefined && oneSelectedYear != undefined) {
        if (yearDatas == oneSelectedYear.year) {
          if (monthDatas < oneSelectedMonth?.id) {
            if (datas.tipe == "penerimaan") {
              newPenerimaanSaldoAwal += datas.amount;
            } else {
              newPengeluaranSaldoAwal += datas.amount;
            }
          }
        } else if (yearDatas <= oneSelectedYear.year) {
          if (datas.tipe == "penerimaan") {
            newPenerimaanSaldoAwal += datas.amount;
          } else {
            newPengeluaranSaldoAwal += datas.amount;
          }
        }
      }
    });
    setsaldoAwal(newPenerimaanSaldoAwal - newPengeluaranSaldoAwal);
  };

  const exportPDFHandler = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Laporan Per Bulan",
    onAfterPrint: () => alert("Laporan tersimpan"),
  });

  const exportExcelHandler = useDownloadExcel({
    currentTableRef: componentPDF.current,
    filename: "Laporan Per Bulan",
    sheet: "Kegiatan Opersional",
  });

  useEffect(() => {
    table.getColumn("month")?.setFilterValue(getCurrentMonthAbbreviation());
    setLoading(false);
    getPenerimaandanPengeluaranBulanIni();
    getSaldoAwal();
  }, []);

  useEffect(() => {
    getPenerimaandanPengeluaranBulanIni();
    getSaldoAwal();
  }, [selectedYear, selectedMonth]);

  if (loading) {
    return (
      <div className=" w-full h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-md border bg-white px-5 py-2">
        <div className="flex items-center py-2 justify-between gap-8">
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
                              // if (index2 !== -1) {
                              //   updatedMonths[index2].isSelected = true;
                              //   table.getRow().original.month == updatedMonths[index2].month
                              //   setoneSelectedMonth(updatedMonths[index2]);
                              // }
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
                                setoneSelectedYear(updatedYears[index2]);
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
              {/* EXPORT PDF */}
              <Button onClick={exportPDFHandler}>Export PDF</Button>
              {/* <Button onClick={exportExcelHandler}>Export Excel</Button> */}
              <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={componentPDF.current}
              >
                <button> Export excel </button>
              </DownloadTableExcel>
            </div>
          </div>
        </div>
        <div className=" rounded-md border" ref={componentPDF}>
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
                  <TableHead style={{ width: "10%" }}>Total Saldo</TableHead>
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-xs md:text-sm text-left font-medium">
                  Saldo Awal
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="hidden"></TableCell>
                <TableCell className="hidden"></TableCell>
                <TableCell className="px-1 py-[2px]">
                  <div className="text-xs md:text-sm text-left font-medium">
                    Rp{commafy(saldoAwal)}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs md:text-sm text-left font-medium">
                  Pemasukan
                </TableCell>
              </TableRow>
              {/* PEMASUKAN */}
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      let data: TransactionType = cell.row.original;
                      if (data.tipe == "penerimaan") {
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
                            }  `}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      }
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
              <TableRow>
                <TableCell className="text-xs md:text-sm text-left font-medium">
                  Pengeluaran
                </TableCell>
              </TableRow>
              {/* Pengeluaran */}
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      let data: TransactionType = cell.row.original;
                      if (data.tipe == "pengeluaran") {
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
                            }  `}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      }
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
              <TableRow>
                <TableCell className=" font-bold text-xs md:text-sm">
                  Selisi Saldo
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="hidden"></TableCell>
                <TableCell className="hidden"></TableCell>
                <TableCell className="px-1 py-[2px]">
                  <div className="text-xs md:text-sm text-left font-medium">
                    Rp{commafy(penerimaanBulanIni)}
                  </div>
                </TableCell>
                <TableCell className="px-1 py-[2px]">
                  <div className="text-xs md:text-sm text-left font-medium">
                    Rp{commafy(pengeluaranBulanIni)}
                  </div>
                </TableCell>
                <TableCell className="px-1 py-[2px]">
                  <div className="text-xs md:text-sm text-left font-medium">
                    Rp{commafy(penerimaanBulanIni - pengeluaranBulanIni)}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold text-xs md:text-sm">
                  Total Saldo
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell className="hidden"></TableCell>
                <TableCell className="hidden"></TableCell>
                <TableCell className="px-1 py-[2px]">
                  <div className="text-xs md:text-sm text-left font-medium">
                    Rp{" "}
                    {commafy(
                      saldoAwal + penerimaanBulanIni - pengeluaranBulanIni
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
