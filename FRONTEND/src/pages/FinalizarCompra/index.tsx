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


const handleCheckout = async () => {
  if (cartItems.length === 0) {
    alert('O carrinho está vazio!');
    return;
  }

  const item = cartItems[0];

  const payload = {
    Title: item.title,
    Price: item.price,
    PayerEmail: "teste@email.com",
    PayerName: "Maria",
    PayerSurname: "Santos",
    PayerDocument: "50666733893",
    OrderId: "PEDIDO-67890"
  };

  try {
    const response = await fetch("http://localhost:5266/api/Pagamento/create-preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
        const formData = new FormData(form);

        const data: DeliveryFormData = Object.fromEntries(formData.entries()) as unknown as DeliveryFormData;
        console.log("Dados enviados:", data);

        try {
            const response = await fetch('http://localhost:5266/api/enderecoclientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const savedClient = await response.json();
                console.log('Endereço salvo com sucesso:', savedClient);
                alert('Endereço salvo com sucesso!');

                await handleCheckout();

            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Erro desconhecido ao salvar.';
                console.error('Erro do servidor:', errorMessage);
                alert(`Erro do servidor: ${errorMessage}`);
            }

        } catch (err) {

            console.error('Erro na requisição:', err);
            alert('Erro de conexão com o servidor. Por favor, tente novamente.');
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
                            <input type="text" id="firstName" name="firstName" placeholder="" autoComplete="given-name" required />
                        </div>
                        <div className="grid-item two-columns">
                            <label htmlFor="lastName">Sobrenome</label>
                            <input type="text" id="lastName" name="lastName" placeholder="" autoComplete="family-name" required />
                        </div>
                        <div className="grid-item full-width postcode-wrapper">
                            <label htmlFor="postalCode">Código postal</label>
                            <input type="text" id="postalCode" name="postalCode" placeholder="" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}-?[0-9]{3}" required />
                            <FaSearch className="search-icon" />
                        </div>
                        <div className="grid-item full-width">
                            <label htmlFor="address">Endereço</label>
                            <input type="text" id="address" name="address" placeholder="" autoComplete="street-address" required />
                        </div>
                        <div className="grid-item full-width">
                            <label htmlFor="complement">Apartamento, bloco, etc</label>
                            <input type="text" id="complement" name="complement" placeholder="" autoComplete="address-line2" />
                        </div>
                        <div className="grid-item two-columns">
                            <label htmlFor="city">Cidade</label>
                            <input type="text" id="city" name="city" placeholder="" autoComplete="address-level2" required />
                        </div>
                        <div className="grid-item two-columns">
                            <label htmlFor="state">Estado</label>
                            <select id="state" name="state" autoComplete="address-level1" required>
                                <option value="">Selecione</option>
                                {estados.map(estado => (
                                    <option key={estado.value} value={estado.value}>{estado.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="grid-item full-width phone-wrapper">
                            <label htmlFor="phone">Telefone</label>
                            <input type="tel" id="phone" name="phone" placeholder="" autoComplete="tel" required />
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