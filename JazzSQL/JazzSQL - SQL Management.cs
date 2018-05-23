
//JazzSQL by ErkmenEsen 2018

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;

namespace JazzSQL.Models.Core
{
    public class JazzSQL
    {

        private static string _connectionString;

        public static void InitConnectionString(string connectionString)
        {
            _connectionString = connectionString;
        }

        public static DateTime GetServerDateTime()
        {
            return new SqlServer(_connectionString).GetServerDateTime();
        }
        public static DateTime GetServerUtcDateTime()
        {
            return new SqlServer(_connectionString).GetServerUtcDateTime();
        }

        public static string GetScalar(string commandText, List<IDbDataParameter> parameterValues,
            CommandType commandType)
        {
            return new SqlServer(_connectionString).GetScalar(commandText, parameterValues, commandType);
        }
        public static string GetScalar(string commandText, List<IDbDataParameter> parameterValues)
        {
            return new SqlServer(_connectionString).GetScalar(commandText, parameterValues, CommandType.Text);
        }
        public static string GetScalar(string commandText)
        {
            return new SqlServer(_connectionString).GetScalar(commandText, null, CommandType.Text);
        }

        public static int NonQuery(string commandText, List<IDbDataParameter> parameterValues, CommandType commandType)
        {
            return new SqlServer(_connectionString).NonQuery(commandText, parameterValues, commandType);
        }
        public static int NonQuery(string commandText, List<IDbDataParameter> parameterValues)
        {
            return new SqlServer(_connectionString).NonQuery(commandText, parameterValues, CommandType.Text);
        }
        public static int NonQuery(string commandText)
        {
            return new SqlServer(_connectionString).NonQuery(commandText, null, CommandType.Text);
        }

        public static SqlDataReader GetDataReader(string commandText, List<IDbDataParameter> parameterValues, CommandType commandType)
        {
            return
                (SqlDataReader)
                    new SqlServer(_connectionString).GetDataReader(commandText, parameterValues, commandType);
        }
        public static SqlDataReader GetDataReader(string commandText, List<IDbDataParameter> parameterValues)
        {
            return
                (SqlDataReader)
                    new SqlServer(_connectionString).GetDataReader(commandText, parameterValues, CommandType.Text);
        }
        public static SqlDataReader GetDataReader(string commandText)
        {
            return
                (SqlDataReader)
                    new SqlServer(_connectionString).GetDataReader(commandText, null, CommandType.Text);
        }

        public static DataSet GetDataset(string commandText, List<IDbDataParameter> parameterValues, CommandType commandType)
        {
            return new SqlServer(_connectionString).GetDataset(commandText, parameterValues, commandType);
        }
        public static DataSet GetDataset(string commandText, List<IDbDataParameter> parameterValues)
        {
            return new SqlServer(_connectionString).GetDataset(commandText, parameterValues, CommandType.Text);
        }
        public static DataSet GetDataset(string commandText)
        {
            return new SqlServer(_connectionString).GetDataset(commandText, null, CommandType.Text);
        }

        public static DataTable GetDataTable(string commandText, List<IDbDataParameter> parameterValues, CommandType commandType)
        {
            var ds = new SqlServer(_connectionString).GetDataset(commandText, parameterValues, commandType);
            if (ds != null && ds.Tables.Count > 0)
            {
                return ds.Tables[0];
            }
            else return null;
        }
        public static DataTable GetDataTable(string commandText, List<IDbDataParameter> parameterValues)
        {
            var ds = new SqlServer(_connectionString).GetDataset(commandText, parameterValues, CommandType.Text);
            if (ds != null && ds.Tables.Count > 0)
            {
                return ds.Tables[0];
            }
            else return null;
        }

        public static DataTable GetDataTable(string connectionString, string commandText, List<IDbDataParameter> parameterValues)
        {
            var ds = new SqlServer(connectionString).GetDataset(commandText, parameterValues, CommandType.Text);
            if (ds != null && ds.Tables.Count > 0)
            {
                return ds.Tables[0];
            }
            else return null;
        }

        public static DataTable GetDataTable(string commandText)
        {
            var ds = new SqlServer(_connectionString).GetDataset(commandText, null, CommandType.Text);
            if (ds != null && ds.Tables.Count > 0)
            {
                return ds.Tables[0];
            }
            else return null;
        }

        public static bool BulkCopyToTable(DataTable dt, string targetTableName)
        {
            var ds = new SqlServer(_connectionString).BulkCopy(dt, targetTableName);

            return ds ? true : false;
        }

        public static string RightOut(string original, int numberCharacters)
        {
            return original.Substring(0, original.Length - numberCharacters);
        }

        public static string ConvertDataTableToHTMLOriginal(DataTable dt)
        {
            string html = "<table>";
            //add header row
            html += "<tr>";
            for (int i = 0; i < dt.Columns.Count; i++)
                html += "<td>" + dt.Columns[i].ColumnName + "</td>";
            html += "</tr>";
            //add rows
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                html += "<tr>";
                for (int j = 0; j < dt.Columns.Count; j++)
                    html += "<td>" + dt.Rows[i][j].ToString() + "</td>";
                html += "</tr>";
            }
            html += "</table>";
            return html;
        }

    
        public class SqlServer
        {
            public SqlServer(string connectionString)
            {
                ConnectionString = connectionString;
            }

            private string ConnectionString { get; set; }

            private SqlCommand _sqlComm;
            private SqlDataAdapter _sqlDa;

            private SqlConnection Connection
            {
                get
                {
                    return new SqlConnection(ConnectionString);
                }
            }

            public SqlParameterCollection Parameters
            {
                get { return _sqlComm.Parameters; }
            }

            public bool BulkCopy(DataTable dt, string targetTableName)
            {
                var sqlConn = Connection;
                sqlConn.Open();

                using (SqlTransaction transaction = sqlConn.BeginTransaction())
                {
                    using (SqlBulkCopy bulkCopy = new SqlBulkCopy(sqlConn, SqlBulkCopyOptions.KeepIdentity, transaction))
                    {
                        bulkCopy.BatchSize = 10;
                        bulkCopy.DestinationTableName = targetTableName;

                        try
                        {
                            bulkCopy.WriteToServer(dt);
                            transaction.Commit();
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message);
                            transaction.Rollback();

                            return false;
                        }
                        finally
                        {
                            dt.Clear();
                            GC.Collect();
                        }
                        return true;
                    }
                }
            }

            public string GetScalar(string commandText, List<IDbDataParameter> parameterValues, CommandType commandType)
            {
                var sqlConn = Connection;
                sqlConn.Open();

                _sqlComm = new SqlCommand(commandText, sqlConn) { CommandTimeout = 600, CommandType = commandType };
                if ((parameterValues != null))
                {
                    foreach (var parameter in parameterValues)
                    {
                        _sqlComm.Parameters.Add(parameter);
                    }
                }
                var res = _sqlComm.ExecuteScalar().ToString();
                sqlConn.Close();

                return res;
            }

            public DateTime GetServerDateTime()
            {
                return DateTime.Parse(GetScalar("SELECT GETDATE()", null, CommandType.Text));
            }

            public DateTime GetServerUtcDateTime()
            {
                return DateTime.Parse(GetScalar("SELECT GETUTCDATE()", null, CommandType.Text));
            }


            public void Dispose()
            {
                Connection.Dispose();
                _sqlComm.Dispose();
                _sqlDa.Dispose();
                GC.SuppressFinalize(this);
            }

            public int NonQuery(string commandText, List<IDbDataParameter> parameterValues, CommandType commandType)
            {
                var sqlConn = Connection;
                sqlConn.Open();

                _sqlComm = new SqlCommand(commandText, sqlConn) { CommandTimeout = 600, CommandType = commandType };
                if ((parameterValues != null))
                {
                    foreach (var parameter in parameterValues)
                    {
                        _sqlComm.Parameters.Add(parameter);
                    }
                }
                var res = _sqlComm.ExecuteNonQuery();
                sqlConn.Close();
                return res;
            }

            public IDataReader GetDataReader(string commandText, List<IDbDataParameter> parameterValues, CommandType commandType)
            {
                var sqlConn = Connection;
                sqlConn.Open();

                try
                {
                    _sqlComm = new SqlCommand(commandText, sqlConn) { CommandTimeout = 600, CommandType = commandType };
                    if ((parameterValues != null))
                    {
                        foreach (var parameter in parameterValues)
                        {
                            _sqlComm.Parameters.Add(parameter);
                        }
                    }
                    var res = _sqlComm.ExecuteReader(CommandBehavior.CloseConnection);
                    sqlConn.Close();
                    return res;
                }
                catch (Exception)
                {
                    sqlConn.Close();
                    throw;
                }
            }

            public DataSet GetDataset(string commandText, List<IDbDataParameter> parameterValues,
                CommandType commandType)
            {
                var res = new DataSet();
                var sqlConn = Connection;
                sqlConn.Open();
                _sqlComm = new SqlCommand(commandText, sqlConn) { CommandTimeout = 600, CommandType = commandType };
                if ((parameterValues != null))
                {
                    foreach (var parameter in parameterValues)
                    {
                        _sqlComm.Parameters.Add(parameter);
                    }
                }
                _sqlDa = new SqlDataAdapter(_sqlComm);

                _sqlDa.Fill(res);
                sqlConn.Close();
                return res;
            }

        }
    }
}
