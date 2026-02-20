import { useContext, useEffect, useState } from 'react';
import './index.scss';
import { FaSearch, FaQuestionCircle } from "react-icons/fa";
import { DeliveryFormData } from '../../types';
import AppContext from '../../context/AppContext';

const estados = [
    { value: 'AC', label: 'Acre' }, { value: 'AL', label: 'Alagoas' }, { value: 'AP', label: 'Amapá' }, { value: 'AM', label: 'Amazonas' }, { value: 'BA', label: 'Bahia' }, { value: 'CE', label: 'Ceará' }, { value: 'DF', label: 'Distrito Federal' }, { value: 'ES', label: 'Espírito Santo' }, { value: 'GO', label: 'Goiás' }, { value: 'MA', label: 'Maranhão' }, { value: 'MT', label: 'Mato Grosso' }, { value: 'MS', label: 'Mato Grosso do Sul' }, { value: 'MG', label: 'Minas Gerais' }, { value: 'PA', label: 'Pará' }, { value: 'PB', label: 'Paraíba' }, { value: 'PR', label: 'Paraná' }, { value: 'PE', label: 'Pernambuco' }, { value: 'PI', label: 'Piauí' }, { value: 'RJ', label: 'Rio de Janeiro' }, { value: 'RN', label: 'Rio Grande do Norte' }, { value: 'RS', label: 'Rio Grande do Sul' }, { value: 'RO', label: 'Rondônia' }, { value: 'RR', label: 'Roraima' }, { value: 'SC', label: 'Santa Catarina' }, { value: 'SP', label: 'São Paulo' }, { value: 'SE', label: 'Sergipe' }, { value: 'TO', label: 'Tocantins' },
];

const FinalizarCompra = () => {
    const { cartItems } = useContext(AppContext);

    const handleCheckout = async (formData?: DeliveryFormData) => {
        if (cartItems.length === 0) {
            alert('O carrinho está vazio!');
            return;
        }

        const totalVenda = cartItems.reduce((acc, item) => acc + item.price, 0);

        const payload = {
            Title: cartItems.length > 1 ? `Pedido Fitness Store (${cartItems.length} itens)` : cartItems[0].title,
            Price: totalVenda,
            PayerEmail: "teste@email.com",
            PayerName: formData?.firstName || "Tiaguinho",
            PayerSurname: formData?.lastName || "Santos",
            PayerDocument: "50666733893",
            OrderId: `PEDIDO-${Math.floor(Math.random() * 100000)}`
        };

        try {
            const response = await fetch("https://fitness-store-backend-kn2k.onrender.com/api/Pagamento/create-preference", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const text = await response.text();
            if (response.ok) {
                const data = JSON.parse(text);
                window.location.href = data.initPoint;
            } else {
                alert(`Erro: ${text}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Não foi possível processar o pagamento.");
        }
    };

    const [cadastro, setCadastro] = useState<DeliveryFormData[]>([]);

    useEffect(() => {
        const itensSalvos = localStorage.getItem('cadastro');
        if (itensSalvos) {
            setCadastro(JSON.parse(itensSalvos));
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formDataRaw = new FormData(form);
        const data: DeliveryFormData = Object.fromEntries(formDataRaw.entries()) as unknown as DeliveryFormData;

        try {
            const response = await fetch('https://fitness-store-backend-kn2k.onrender.com/api/enderecoclientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Endereço salvo com sucesso!');
                await handleCheckout(data);
            } else {
                const errorData = await response.json();
                alert(`Erro do servidor: ${errorData.message || 'Erro desconhecido.'}`);
            }
        } catch (err) {
            alert('Erro de conexão com o servidor.');
        }
    };

    return (
        <div className='containerFinalizarCompra'>
            <div className='content-container'>
                <div className='content-formas'>
                    <h3>Entrega</h3>
                    <form className='delivery-form-grid' onSubmit={handleSubmit} >
                        <div className="grid-item full-width">
                            <label htmlFor="country">País/Região</label>
                            <select id="country" name="country" autoComplete="country" required>
                                <option value="BR">Brasil</option>
                            </select>
                        </div>
                        <div className="grid-item two-columns">
                            <label htmlFor="firstName">Nome</label>
                            <input type="text" id="firstName" name="firstName" required />
                        </div>
                        <div className="grid-item two-columns">
                            <label htmlFor="lastName">Sobrenome</label>
                            <input type="text" id="lastName" name="lastName" required />
                        </div>
                        <div className="grid-item full-width postcode-wrapper">
                            <label htmlFor="postalCode">Código postal</label>
                            <input type="text" id="postalCode" name="postalCode" pattern="[0-9]{5}-?[0-9]{3}" required />
                            <FaSearch className="search-icon" />
                        </div>
                        <div className="grid-item full-width">
                            <label htmlFor="address">Endereço</label>
                            <input type="text" id="address" name="address" required />
                        </div>
                        <div className="grid-item full-width">
                            <label htmlFor="complement">Apartamento, bloco, etc</label>
                            <input type="text" id="complement" name="complement" />
                        </div>
                        <div className="grid-item two-columns">
                            <label htmlFor="city">Cidade</label>
                            <input type="text" id="city" name="city" required />
                        </div>
                        <div className="grid-item two-columns">
                            <label htmlFor="state">Estado</label>
                            <select id="state" name="state" required>
                                <option value="">Selecione</option>
                                {estados.map(estado => (
                                    <option key={estado.value} value={estado.value}>{estado.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid-item full-width phone-wrapper">
                            <label htmlFor="phone">Telefone</label>
                            <input type="tel" id="phone" name="phone" required />
                            <FaQuestionCircle className="info-icon" />
                        </div>
                        <button className="carrinho-btn" type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FinalizarCompra;