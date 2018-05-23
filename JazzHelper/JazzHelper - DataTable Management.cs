
//JazzDataTableHelper by ErkmenEsen 2018

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;

namespace JazzDataTableHelper.Models
{
    public static class JazzDataTableHelper
    {
        public static List<T> DataTableToList<T>(this DataTable dataTable) where T : new()
        {
            var dataList = new List<T>();

            //Define what attributes to be read from the class
            const BindingFlags flags = BindingFlags.Public | BindingFlags.Instance;

            //Read Attribute Names and Types
            var objFieldNames = typeof(T).GetProperties(flags).
                Select(item => new
                {
                    item.Name,
                    Type = Nullable.GetUnderlyingType(item.PropertyType) ?? item.PropertyType
                }).ToList();

            //Read Datatable column names and types
            var dtlFieldNames = dataTable.Columns.Cast<DataColumn>().
                Select(item => new
                {
                    Name = item.ColumnName,
                    Type = item.DataType
                }).ToList();

            foreach (DataRow dataRow in dataTable.AsEnumerable().ToList())
            {
                var classObj = new T();

                foreach (var dtField in dtlFieldNames)
                {
                    var propertyInfos = classObj.GetType().GetProperty(dtField.Name);

                    var field = objFieldNames.Find(x => x.Name == dtField.Name);

                    if (field == null) continue;
                    if (propertyInfos.PropertyType == typeof(DateTime))
                    {
                        propertyInfos.SetValue
                            (classObj, ConvertToDateTime(dataRow[dtField.Name]), null);
                    }
                    else if (propertyInfos.PropertyType == typeof(DateTime?))
                    {
                        propertyInfos.SetValue
                            (classObj, ConvertToDateTime(dataRow[dtField.Name]), null);
                    }
                    else if (propertyInfos.PropertyType == typeof(int))
                    {
                        propertyInfos.SetValue
                            (classObj, ConvertToInt(dataRow[dtField.Name]), null);
                    }
                    else if (propertyInfos.PropertyType == typeof(long))
                    {
                        propertyInfos.SetValue
                            (classObj, ConvertToLong(dataRow[dtField.Name]), null);
                    }
                    else if (propertyInfos.PropertyType == typeof(Guid))
                    {
                        propertyInfos.SetValue
                            (classObj, ConvertToGuid(dataRow[dtField.Name]), null);
                    }
                    else if (propertyInfos.PropertyType == typeof(Guid?))
                    {
                        propertyInfos.SetValue
                            (classObj, ConvertToGuid(dataRow[dtField.Name]), null);
                    }
                    else if (propertyInfos.PropertyType == typeof(decimal))
                    {
                        propertyInfos.SetValue
                            (classObj, ConvertToDecimal(dataRow[dtField.Name]), null);
                    }
                    else if (propertyInfos.PropertyType == typeof(String))
                    {
                        if (dataRow[dtField.Name] is DateTime)
                        {
                            propertyInfos.SetValue
                                (classObj, ConvertToDateString(dataRow[dtField.Name]), null);
                        }
                        else
                        {
                            propertyInfos.SetValue
                                (classObj, ConvertToString(dataRow[dtField.Name]), null);
                        }
                    }
                    else
                    {
                        propertyInfos.SetValue
                            (classObj, Convert.ChangeType(dataRow[dtField.Name], propertyInfos.PropertyType), null);
                    }
                }
                dataList.Add(classObj);
            }
            return dataList;
        }

        private static Guid ConvertToGuid(object o)
        {
            return (Guid)ReturnGuidIfNull(o);
        }

        private static string ConvertToDateString(object date)
        {
            return date == null ? string.Empty : Convert.ToDateTime(date).ConvertDate();
        }

        private static string ConvertToString(object value)
        {
            return Convert.ToString(ReturnEmptyIfNull(value));
        }

        private static int ConvertToInt(object value)
        {
            return Convert.ToInt32(ReturnZeroIfNull(value));
        }

        private static long ConvertToLong(object value)
        {
            return Convert.ToInt64(ReturnZeroIfNull(value));
        }

        private static decimal ConvertToDecimal(object value)
        {
            return Convert.ToDecimal(ReturnZeroIfNull(value));
        }

        private static DateTime ConvertToDateTime(object date)
        {
            return Convert.ToDateTime(ReturnDateTimeMinIfNull(date));
        }

        public static string ConvertDate(this DateTime datetTime, bool excludeHoursAndMinutes = false)
        {
            return datetTime == DateTime.MinValue ? null : datetTime.ToString(excludeHoursAndMinutes ? "yyyy-MM-dd" : "yyyy-MM-dd HH:mm:ss.fff");
        }

        public static object ReturnEmptyIfNull(this object value)
        {
            if (value == DBNull.Value)
                return string.Empty;
            return value ?? string.Empty;
        }
        public static object ReturnZeroIfNull(this object value)
        {
            if (value == DBNull.Value)
                return 0;
            return value ?? 0;
        }
        public static object ReturnDateTimeMinIfNull(this object value)
        {
            if (value == DBNull.Value)
                return DateTime.MinValue;
            return value ?? DateTime.MinValue;
        }
        public static object ReturnGuidIfNull(this object value)
        {
            if (value == DBNull.Value)
                return Guid.Empty;
            return value ?? Guid.Empty;
        }

    }

}
