<script>
    const products = [
      { name: "BlueSkyPhase", description: 'Agende seu post na rede social blue sky', href: "/blue-sky-phase",  details: "Blue Sky Phase' Details" },
      { name: 'MailMass', description: 'Envie e-mails em massa de forma eficaz e eficiente.', href: "/login",  details: "MailMass Details" },
      { name: 'CryptoStomp', description: 'Uma solução inovadora para criptomoedas.', href : "/login", details: "CryptoStomp Details" },
      { name: 'BetInsigth', description: 'Aposte com confiança e insights avançados.', href: "/login",  details: "BetInsigth Details"  },

    ];
  </script>
  
  <style>
    .products {
      
      padding: 2rem;
      border-radius: 5px;
      width: 90%;
      margin-bottom: 20px;
    }
  
    .products h2 {
      text-align: center;
      margin-bottom: 2rem;
    }
  
    .product-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .product-item {
      background: #82b3ae;
      color: #230f2b;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      max-width: 600px;
      width: 100%;
    }
  
    .product-item h3 {
      margin-top: 0;
    }

    .product-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    margin-top: 1rem;
    text-decoration: none;
    color: #fff;
    background-color: #230f2b;
    border: 2px solid #230f2b;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .product-button:hover {
    background-color: #fff;
    color: #230f2b;
  }

  </style>
  
  <div class="products">
    <div class="product-list">
      {#each products as product}
        <div class="product-item">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <a href={product.href} class="product-button">{product.name} Details</a>
        </div>
      {/each}
    </div>
  </div>
  