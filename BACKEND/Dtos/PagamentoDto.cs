#nullable enable

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BACKEND.Dtos
{
    public class CreatePreferenceDto
    {
        public string? Title { get; set; }
        public decimal? Price { get; set; }
        public string? PayerEmail { get; set; }
        public string? PayerName { get; set; }
        public string? PayerSurname { get; set; }
        public string? PayerDocument { get; set; }
        public string? OrderId { get; set; }
    }

    public class CreatePaymentDto
    {
        public string? OrderId { get; set; }
        public decimal? Amount { get; set; }
        public string? Description { get; set; }
        public string? PayerEmail { get; set; }
        public string? PayerFirstName { get; set; }
        public string? PayerLastName { get; set; }
        public string? PayerDocument { get; set; }
        
        // Para boleto (obrigatório)
        public string? PayerZipCode { get; set; }
        public string? PayerAddress { get; set; }
        public string? PayerNumber { get; set; }
        public string? PayerNeighborhood { get; set; }
        public string? PayerCity { get; set; }
        public string? PayerState { get; set; }
    }

    // Modelos de resposta
    public class PreferenceResponse
    {
        public string? Id { get; set; }
        public string? InitPoint { get; set; }
        public string? SandboxInitPoint { get; set; }
    }

    public class PixPaymentResponse
    {
        public long Id { get; set; }
        public string? Status { get; set; }
        [JsonPropertyName("point_of_interaction")]
        public PointOfInteraction? PointOfInteraction { get; set; }
    }

    public class BoletoPaymentResponse
    {
        public long Id { get; set; }
        public string? Status { get; set; }
        [JsonPropertyName("point_of_interaction")]
        public PointOfInteraction? PointOfInteraction { get; set; }
    }

    public class PointOfInteraction
    {
        [JsonPropertyName("transaction_data")]
        public TransactionData? TransactionData { get; set; }
    }

    public class TransactionData
    {
        [JsonPropertyName("qr_code")]
        public string? QrCode { get; set; }
        [JsonPropertyName("qr_code_base64")]
        public string? QrCodeBase64 { get; set; }
        [JsonPropertyName("ticket_url")]
        public string? TicketUrl { get; set; }
        [JsonPropertyName("barcode_content")]
        public string? BarcodeContent { get; set; }
        [JsonPropertyName("external_resource_url")]
        public string? ExternalResourceUrl { get; set; }
    }

    public class PaymentStatusResponse
    {
        public string? Status { get; set; }
        public string? StatusDetail { get; set; }
        public decimal? TransactionAmount { get; set; }
    }
}