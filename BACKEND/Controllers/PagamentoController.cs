using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using BACKEND.Dtos;

[ApiController]
[Route("api/[controller]")]
public class PagamentoController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public PagamentoController(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    [HttpPost("create-preference")]
    public async Task<IActionResult> CreatePreference([FromBody] CreatePreferenceDto preferenceDto)
    {
        try
        {
            var accessToken = _config["MercadoPago:AccessToken"];
            
            var preference = new
            {
                items = new[]
                {
                    new
                    {
                        title = preferenceDto.Title,
                        quantity = 1,
                        currency_id = "BRL",
                        unit_price = preferenceDto.Price
                    }
                },
                payer = new
                {
                    email = preferenceDto.PayerEmail,
                    name = preferenceDto.PayerName,
                    surname = preferenceDto.PayerSurname,
                    identification = new
                    {
                        type = "CPF",
                        number = preferenceDto.PayerDocument
                    }
                },
                payment_methods = new
                {
                    excluded_payment_methods = new object[] { },
                    excluded_payment_types = new object[] { },
                    installments = 12
                },
                back_urls = new
                {
                    success = $"{_config["BaseUrl"]}/payment/success",
                    failure = $"{_config["BaseUrl"]}/payment/failure",
                    pending = $"{_config["BaseUrl"]}/payment/pending"
                },
                auto_return = "approved",
                external_reference = preferenceDto.OrderId
            };

            var json = JsonSerializer.Serialize(preference, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
            });

            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken}");

            var response = await _httpClient.PostAsync("https://api.mercadopago.com/checkout/preferences", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var preferenceResponse = JsonSerializer.Deserialize<PreferenceResponse>(responseContent, 
                    new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower });

                return Ok(new
                {
                    PreferenceId = preferenceResponse?.Id,
                    InitPoint = preferenceResponse?.InitPoint,
                    SandboxInitPoint = preferenceResponse?.SandboxInitPoint
                });
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                return BadRequest($"Erro MercadoPago: {errorContent}");
            }
        }
        catch (Exception ex)
        {
            return BadRequest($"Erro ao criar preferência: {ex.Message}");
        }
    }

    // Cria um pagamento via PIX, retornando um QR Code
    [HttpPost("create-pix")]
    public async Task<IActionResult> CreatePixPayment([FromBody] CreatePaymentDto paymentDto)
    {
        try
        {
            if (string.IsNullOrEmpty(paymentDto.PayerDocument) || paymentDto.PayerDocument.Length != 11)
            {
                return BadRequest("O CPF do pagador deve ser um número válido de 11 dígitos.");
            }

            var accessToken = _config["MercadoPago:AccessToken"];
            
            var payment = new
            {
                transaction_amount = paymentDto.Amount,
                description = paymentDto.Description,
                payment_method_id = "pix",
                payer = new
                {
                    email = paymentDto.PayerEmail,
                    first_name = paymentDto.PayerFirstName,
                    last_name = paymentDto.PayerLastName,
                    identification = new
                    {
                        type = "CPF",
                        number = paymentDto.PayerDocument
                    }
                },
                external_reference = paymentDto.OrderId
            };

            var json = JsonSerializer.Serialize(payment, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
            });

            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken}");
            _httpClient.DefaultRequestHeaders.Add("X-Idempotency-Key", Guid.NewGuid().ToString());

            var response = await _httpClient.PostAsync("https://api.mercadopago.com/v1/payments", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var paymentResponse = JsonSerializer.Deserialize<PixPaymentResponse>(responseContent,
                    new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower });

                return Ok(new
                {
                    PaymentId = paymentResponse?.Id,
                    Status = paymentResponse?.Status,
                    QrCode = paymentResponse?.PointOfInteraction?.TransactionData?.QrCode,
                    QrCodeBase64 = paymentResponse?.PointOfInteraction?.TransactionData?.QrCodeBase64,
                    TicketUrl = paymentResponse?.PointOfInteraction?.TransactionData?.TicketUrl
                });
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                return BadRequest($"Erro ao criar PIX: {errorContent}");
            }
        }
        catch (Exception ex)
        {
            return BadRequest($"Erro: {ex.Message}");
        }
    }

    [HttpPost("create-boleto")]
    public async Task<IActionResult> CreateBoleto([FromBody] CreatePaymentDto paymentDto)
    {
        try
        {
            if (string.IsNullOrEmpty(paymentDto.PayerDocument) || paymentDto.PayerDocument.Length != 11)
            {
                return BadRequest("O CPF do pagador deve ser um número válido de 11 dígitos.");
            }
            
            if (string.IsNullOrEmpty(paymentDto.PayerZipCode) || string.IsNullOrEmpty(paymentDto.PayerAddress) ||
                string.IsNullOrEmpty(paymentDto.PayerNumber) || string.IsNullOrEmpty(paymentDto.PayerCity) ||
                string.IsNullOrEmpty(paymentDto.PayerState))
            {
                return BadRequest("Todos os campos de endereço são obrigatórios para a criação de boleto.");
            }

            var accessToken = _config["MercadoPago:AccessToken"];

            var payment = new
            {
                transaction_amount = paymentDto.Amount,
                description = paymentDto.Description,
                payment_method_id = "bolbradesco", 
                payer = new
                {
                    email = paymentDto.PayerEmail,
                    first_name = paymentDto.PayerFirstName,
                    last_name = paymentDto.PayerLastName,
                    identification = new
                    {
                        type = "CPF",
                        number = paymentDto.PayerDocument
                    },
                    address = new
                    {
                        zip_code = paymentDto.PayerZipCode,
                        street_name = paymentDto.PayerAddress,
                        street_number = paymentDto.PayerNumber,
                        neighborhood = paymentDto.PayerNeighborhood,
                        city = paymentDto.PayerCity,
                        federal_unit = paymentDto.PayerState
                    }
                },
                external_reference = paymentDto.OrderId,
                date_of_expiration = DateTime.Now.AddDays(3).ToString("yyyy-MM-ddTHH:mm:ss.fffzzz")
            };

            var json = JsonSerializer.Serialize(payment, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
            });

            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken}");
            _httpClient.DefaultRequestHeaders.Add("X-Idempotency-Key", Guid.NewGuid().ToString());

            var response = await _httpClient.PostAsync("https://api.mercadopago.com/v1/payments", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var paymentResponse = JsonSerializer.Deserialize<BoletoPaymentResponse>(responseContent,
                    new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower });

                return Ok(new
                {
                    PaymentId = paymentResponse?.Id,
                    Status = paymentResponse?.Status,
                    TicketUrl = paymentResponse?.PointOfInteraction?.TransactionData?.TicketUrl,
                    BarcodeContent = paymentResponse?.PointOfInteraction?.TransactionData?.BarcodeContent,
                    ExternalResourceUrl = paymentResponse?.PointOfInteraction?.TransactionData?.ExternalResourceUrl
                });
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                return BadRequest($"Erro ao criar boleto: {errorContent}");
            }
        }
        catch (Exception ex)
        {
            return BadRequest($"Erro: {ex.Message}");
        }
    }

    [HttpGet("status/{paymentId}")]
    public async Task<IActionResult> GetPaymentStatus(string paymentId)
    {
        try
        {
            var accessToken = _config["MercadoPago:AccessToken"];
            
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {accessToken}");

            var response = await _httpClient.GetAsync($"https://api.mercadopago.com/v1/payments/{paymentId}");

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var payment = JsonSerializer.Deserialize<PaymentStatusResponse>(responseContent,
                    new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower });

                return Ok(new
                {
                    Status = payment?.Status,
                    StatusDetail = payment?.StatusDetail,
                    TransactionAmount = payment?.TransactionAmount
                });
            }

            return NotFound("Pagamento não encontrado");
        }
        catch (Exception ex)
        {
            return BadRequest($"Erro: {ex.Message}");
        }
    }
}

