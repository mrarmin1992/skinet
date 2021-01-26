using System;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }


        public int StatusCode { get; set; }
        public string Message { get; set; }

          private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch 
            {
                400 => "A bad request have made ",
                401 => "Authorized, you are not",
                404 => "Resources found, it was not",
                500 => "Errors are the path to the dark side. Errors lead to anger. Angers leads to hate, Hate leads to carrer change",
            _ => null
            };
        }
    }
}