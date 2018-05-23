
//JazzExcel by ErkmenEsen 2018

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System.IO;

namespace JazzExcel.Models.Core
{
    static class JazzExcel
    {

        public static DataTable ImportFromExcel(string excel_path)
        {
            //Create a new DataTable.
            DataTable dt = new DataTable();
            //Open the Excel file in Read Mode using OpenXml.
            using (SpreadsheetDocument doc = SpreadsheetDocument.Open(excel_path, false))
            {
                //Read the first Sheet from Excel file.
                Sheet sheet = doc.WorkbookPart.Workbook.Sheets.GetFirstChild<Sheet>();

                //Get the Worksheet instance.
                Worksheet worksheet = (doc.WorkbookPart.GetPartById(sheet.Id.Value) as WorksheetPart).Worksheet;

                //Fetch all the rows present in the Worksheet.
                IEnumerable<Row> rows = worksheet.GetFirstChild<SheetData>().Descendants<Row>();



                //Loop through the Worksheet rows.
                foreach (Row row in rows)
                {
                    //Use the first row to add columns to DataTable.
                    if (row.RowIndex.Value == 1)
                    {
                        foreach (Cell cell in row.Descendants<Cell>())
                        {
                            dt.Columns.Add(GetValue(doc, cell));
                        }
                    }
                    else
                    {
                        //Add rows to DataTable.
                        dt.Rows.Add();
                        int i = 0;
                        foreach (Cell cell in row.Descendants<Cell>())
                        {
                            dt.Rows[dt.Rows.Count - 1][i] = GetValue(doc, cell);
                            i++;
                        }
                    }
                }
                return dt;
            }

        }
        public static string GetValue(SpreadsheetDocument doc, Cell cell)
        {
            string value = cell.CellValue.InnerText;
            if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
            {
                return doc.WorkbookPart.SharedStringTablePart.SharedStringTable.ChildElements.GetItem(int.Parse(value)).InnerText;
            }
            return value;
        }


        public static string ExportToExcel(DataTable table, bool add_is_ext = true)
        {
            string excelfile = Path.GetTempPath() + Guid.NewGuid().ToString();
            if (add_is_ext) { excelfile = excelfile + ".xlsx"; }

            using (SpreadsheetDocument excelDoc = SpreadsheetDocument.Create(excelfile, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
            {
                CreateExcelParts(excelDoc, table);
            }
            return excelfile;
        }
        public static string ExportToExcel(string dosya_yolu, DataTable table, bool add_is_ext = true)
        {
            string excelfile = dosya_yolu;
            if (add_is_ext) { excelfile = excelfile + ".xlsx"; }
            using (SpreadsheetDocument excelDoc = SpreadsheetDocument.Create(excelfile, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
            {
                CreateExcelParts(excelDoc, table);
            }
            return excelfile;
        }

        public static string ExportToExcel(string dosya_yolu, DataTable table, bool is_truncade, bool add_is_ext = true)
        {
            string excelfile = dosya_yolu;
            if (add_is_ext) { excelfile = excelfile + ".xlsx"; }
            if (File.Exists(excelfile))
            {
                if (is_truncade)
                {
                    File.Delete(excelfile);
                    using (SpreadsheetDocument excelDoc = SpreadsheetDocument.Create(excelfile, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
                    {
                        CreateExcelParts(excelDoc, table);
                    }
                }
            }
            else
            {
                using (SpreadsheetDocument excelDoc = SpreadsheetDocument.Create(excelfile, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
                {
                    CreateExcelParts(excelDoc, table);
                }
            }
            return excelfile;
        }

        public static void CreateExcelParts(SpreadsheetDocument spreadsheetDoc, DataTable data)
        {
            WorkbookPart workbookPart = spreadsheetDoc.AddWorkbookPart();
            CreateWorkbookPart(workbookPart);

            int workBookPartCount = 1;

            WorkbookStylesPart workbookStylesPart = workbookPart.AddNewPart<WorkbookStylesPart>("rId" + (workBookPartCount++).ToString());
            CreateWorkbookStylesPart(workbookStylesPart);

            WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>("rId" + (101).ToString());
            CreateWorksheetPart(workbookPart.WorksheetParts.ElementAt(0), data);

            SharedStringTablePart sharedStringTablePart = workbookPart.AddNewPart<SharedStringTablePart>("rId" + (workBookPartCount++).ToString());
            CreateSharedStringTablePart(sharedStringTablePart, data);

            workbookPart.Workbook.Save();
        }

        /// <summary>
        /// Creates the shared string table part.
        /// </summary>
        /// <param name="sharedStringTablePart">The shared string table part.</param>
        /// <param name="sheetData">The sheet data.</param>
        public static void CreateSharedStringTablePart(SharedStringTablePart sharedStringTablePart, DataTable sheetData)
        {
            UInt32Value stringCount = Convert.ToUInt32(sheetData.Rows.Count) + Convert.ToUInt32(sheetData.Columns.Count);

            SharedStringTable sharedStringTable = new SharedStringTable()
            {
                Count = stringCount,
                UniqueCount = stringCount
            };

            for (int columnIndex = 0; columnIndex < sheetData.Columns.Count; columnIndex++)
            {
                SharedStringItem sharedStringItem = new SharedStringItem();
                Text text = new Text();
                text.Text = sheetData.Columns[columnIndex].ColumnName;
                sharedStringItem.Append(text);
                sharedStringTable.Append(sharedStringItem);
            }

            for (int rowIndex = 0; rowIndex < sheetData.Rows.Count; rowIndex++)
            {
                SharedStringItem sharedStringItem = new SharedStringItem();
                Text text = new Text();
                text.Text = sheetData.Rows[rowIndex][0].ToString();
                sharedStringItem.Append(text);
                sharedStringTable.Append(sharedStringItem);
            }

            sharedStringTablePart.SharedStringTable = sharedStringTable;
        }

        /// <summary>
        /// Creates the worksheet part.
        /// </summary>
        /// <param name="worksheetPart">The worksheet part.</param>
        /// <param name="data">The data.</param>
        public static void CreateWorksheetPart(WorksheetPart worksheetPart, DataTable data)
        {
            Worksheet worksheet = new Worksheet() { MCAttributes = new MarkupCompatibilityAttributes() { Ignorable = "x14ac" } };
            worksheet.AddNamespaceDeclaration("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
            worksheet.AddNamespaceDeclaration("mc", "http://schemas.openxmlformats.org/markup-compatibility/2006");
            worksheet.AddNamespaceDeclaration("x14ac", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac");


            SheetViews sheetViews = new SheetViews();
            SheetView sheetView = new SheetView() { WorkbookViewId = (UInt32Value)0U };
            Selection selection = new Selection() { ActiveCell = "A1" };
            sheetView.Append(selection);
            sheetViews.Append(sheetView);

            PageMargins pageMargins = new PageMargins()
            {
                Left = 0.7D,
                Right = 0.7D,
                Top = 0.75D,
                Bottom = 0.75D,
                Header = 0.3D,
                Footer = 0.3D
            };

            SheetFormatProperties sheetFormatPr = new SheetFormatProperties()
            {
                DefaultRowHeight = 15D,
                DyDescent = 0.25D
            };

            SheetData sheetData = new SheetData();

            UInt32Value rowIndex = 1U;

            Row row1 = new Row()
            {
                RowIndex = rowIndex++,
                Spans = new ListValue<StringValue>() { InnerText = "1:3" },
                DyDescent = 0.25D
            };

            for (int columnIndex = 0; columnIndex < data.Columns.Count; columnIndex++)
            {
                Cell cell = new Cell() { CellReference = ColumnCaption.Instance.Get((Convert.ToInt32((UInt32)rowIndex) - 2), columnIndex), DataType = CellValues.String };
                CellValue cellValue = new CellValue();
                cellValue.Text = data.Columns[columnIndex].ColumnName.ToString().FormatCode();
                cell.Append(cellValue);

                row1.Append(cell);
            }
            sheetData.Append(row1);

            for (int rIndex = 0; rIndex < data.Rows.Count; rIndex++)
            {
                Row row = new Row()
                {
                    RowIndex = rowIndex++,
                    Spans = new ListValue<StringValue>() { InnerText = "1:3" },
                    DyDescent = 0.25D
                };

                for (int cIndex = 0; cIndex < data.Columns.Count; cIndex++)
                {
                    if (cIndex == 0)
                    {
                        Cell cell = new Cell() { CellReference = ColumnCaption.Instance.Get((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex), DataType = CellValues.String };
                        CellValue cellValue = new CellValue();
                        cellValue.Text = data.Rows[rIndex][cIndex].ToString();
                        cell.Append(cellValue);

                        row.Append(cell);
                    }
                    else
                    {
                        Cell cell = new Cell() { CellReference = ColumnCaption.Instance.Get((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex), DataType = CellValues.String };
                        CellValue cellValue = new CellValue();
                        cellValue.Text = data.Rows[rIndex][cIndex].ToString();
                        cell.Append(cellValue);

                        row.Append(cell);
                    }
                }
                sheetData.Append(row);
            }

            worksheet.Append(sheetViews);
            worksheet.Append(sheetFormatPr);
            worksheet.Append(sheetData);
            worksheet.Append(pageMargins);
            worksheetPart.Worksheet = worksheet;
        }

        /// <summary>
        /// Creates the workbook styles part.
        /// </summary>
        /// <param name="workbookStylesPart">The workbook styles part.</param>
        public static void CreateWorkbookStylesPart(WorkbookStylesPart workbookStylesPart)
        {
            Stylesheet stylesheet = new Stylesheet() { MCAttributes = new MarkupCompatibilityAttributes() { Ignorable = "x14ac" } };
            stylesheet.AddNamespaceDeclaration("mc", "http://schemas.openxmlformats.org/markup-compatibility/2006");
            stylesheet.AddNamespaceDeclaration("x14ac", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac");

            StylesheetExtensionList stylesheetExtensionList = new StylesheetExtensionList();
            StylesheetExtension stylesheetExtension = new StylesheetExtension() { Uri = "{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" };
            stylesheetExtension.AddNamespaceDeclaration("x14", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main");
            DocumentFormat.OpenXml.Office2010.Excel.SlicerStyles slicerStyles = new DocumentFormat.OpenXml.Office2010.Excel.SlicerStyles() { DefaultSlicerStyle = "SlicerStyleLight1" };
            stylesheetExtension.Append(slicerStyles);
            stylesheetExtensionList.Append(stylesheetExtension);

            stylesheet.Append(stylesheetExtensionList);

            workbookStylesPart.Stylesheet = stylesheet;
        }

        /// <summary>
        /// Creates the workbook part.
        /// </summary>
        /// <param name="workbookPart">The workbook part.</param>
        public static void CreateWorkbookPart(WorkbookPart workbookPart)
        {
            Workbook workbook = new Workbook();
            Sheets sheets = new Sheets();

            Sheet sheet = new Sheet()
            {
                Name = "Book" + 1,
                SheetId = Convert.ToUInt32(101),
                Id = "rId" + (101).ToString()
            };
            sheets.Append(sheet);

            CalculationProperties calculationProperties = new CalculationProperties()
            {
                CalculationId = (UInt32Value)123456U  // some default Int32Value
            };

            workbook.Append(sheets);
            workbook.Append(calculationProperties);

            workbookPart.Workbook = workbook;
        }
    }
    public class ColumnCaption
    {
        private static string[] Alphabets = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };
        private static ColumnCaption instance = null;
        private List<string> cellHeaders = null;
        public static ColumnCaption Instance
        {
            get
            {
                if (instance == null)
                    return new ColumnCaption();
                else return ColumnCaption.Instance;
            }
        }

        public ColumnCaption()
        {
            this.InitCollection();
        }

        private void InitCollection()
        {
            cellHeaders = new List<string>();

            foreach (string sItem in Alphabets)
                cellHeaders.Add(sItem);


            foreach (string item in Alphabets)
                foreach (string sItem in Alphabets)
                    cellHeaders.Add(item + sItem);
        }

        /// <summary>
        /// Returns the column caption for the given row & column index.
        /// </summary>
        /// <param name="rowIndex">Index of the row.</param>
        /// <param name="columnIndex">Index of the column.</param>
        /// <returns></returns>
        internal string Get(int rowIndex, int columnIndex)
        {
            return this.cellHeaders.ElementAt(columnIndex) + (rowIndex + 1).ToString();
        }
    }
    public static class Extensions
    {
        public static string FormatCode(this string sourceString)
        {
            if (sourceString.Contains("<"))
                sourceString = sourceString.Replace("<", "&lt;");

            if (sourceString.Contains(">"))
                sourceString = sourceString.Replace(">", "&gt;");

            return sourceString;
        }
    }

}


