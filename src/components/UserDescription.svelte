<!-- UserDescription.svelte -->

<script>
	/** @type {{currentUser: any}} */
	let { currentUser } = $props();
	// console.log(currentUser);
</script>

<div class="user-info">
	<div class="user-details">
		<div class="container_avatar">
			<img class="avatar" />
			<div class="user-description">
				<h2 class="username">{'maikonweber'}</h2>
			</div>
			<p class="name">{'Maikon'} {'Carvalho'}</p>
			<p class="email">{'maikonweber@gmail.com'}</p>
			<ul class="lista">
				<li class="itens">
					<div class="">Configurações</div>
				</li>
				<li class="itens">
					<div class="">Foto Secretas</div>
				</li>
				<li class="itens">
					<div class="">Galeria</div>
				</li>
				<li class="itens">
					<div class="">Menu</div>
				</li>
			</ul>
			<!-- Adicionar outros campos de descrição conforme necessário -->
		</div>
	</div>
</div>

<style>
	.username {
		font-size: medium;
	}

	.name {
		/* background-color: blanchedalmond; */
		width: 200px;
		font-size: small;
	}

	.email {
		/* background-color: coral; */
		width: 200px;
		font-size: small;
	}

	.lista {
    /* background-color: antiquewhite; */
    width: 200px;
    padding: 10px;
    list-style-type: none;
	}

	.itens {
    /* background-color: chartreuse; */
    margin: 5px 0;
    padding: 10px;
    text-align: center;
    border: 2px solid #000;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
	}

	.itens:hover {
    background-color: lightgreen;
	}


	.user-info {
		margin-bottom: 20px;
		padding: 10px;
		border-radius: 5px;
		/* background-color: blueviolet; */
		height: 100%;
	}

	.avatar {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		object-fit: cover;
		background-color: aqua;

	}

	.user-details {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 600px;
		/* background-color: red; */
	}

	.user-description {
		margin-top: 10px;
		/* background-color: blueviolet; */
	}

	.container_avatar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		border-radius: 2%;
		/* background-color: blue; */
	}
</style>
