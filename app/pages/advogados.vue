<template>
  <div>
    <client-only>
      <DataIterator :items="lawyers" :keys="keys"/>
    </client-only>
    <v-row justify="center">
      <v-col class="ma-2 body-1" md="6" cols="12">
        <h3>IMPORTANTE</h3>
        <p>
          Para se tornar um colunista não é necessário obrigatoriamente trabalhar, ser redator ou escritor profissional. 
        </p>
        <p>Ao se tornar um colunista da UC Advogados, você terá uma página como todos os seus artigos em nosso site. Exemplo:</p>
        <p><v-icon>mdi-arrow-right</v-icon><u>Autor Marcel Camargo</u><br/>
           Dentro dessa página, você poderá divulgar todas as suas mídias e fazer uma descrição de si mesmo e de seu trabalho para um amplo público totalmente direcionado.
        </p>
        <h3>BENEFÍCIOS DE SER UM COLUNISTA:</h3>
        <p>
          <ul>
            <li>Seu nome e produções são divulgados através do seu próprio trabalho.</li>
            <li>Seus textos aparecem na página principal do site UC ADVOGADOS, o que possibilita uma maior divulgação de seu trabalho.</li>
            <li>Como colunista você tem um perfil todo seu, com endereço URL, o que possibilitará ao colunista ampla divulgação do seu trabalho.</li>
            <li>Conforme disponibilidade você poderá fazer lives nas nossas redes sociais, podendo assim, ser divulgado para uma ampla audiência.</li>
            <li>A UC Advogados é considerada o maior site do gênero no Brasil. Tendo apoio de redes sociais com mais de dois milhões de impressões mensais.</li>
            <li>Seus artigos são publicados em diversos canais. No site, em diversos grupos de mídias sociais e nos e-mails diários, que são montados pela nossa redação e enviados a milhares de pessoas em todo o país.</li>
            <li>Após aprovação do editor responsável, o seu artigo ficará disponível em nossa página no Facebook, Telegram e também em nosso Instagram, com mais de 90 mil de seguidores, além diversos outros meios de comunicação.</li>
          </ul>
        </p>
        <h3>PUBLICAÇÃO IDEAL</h3>
        <p>O ideal é evitar a linguagem técnica para aproximar a resolução dos problemas aos cidadãos que os enfrentam diariamente. Como explicar a resolução do caso para alguém que não domina o direito?</p>
        <h3>REGRAS BÁSICAS PARA PUBLICAÇÃO DE ARTIGOS</h3>
        <p>
          <ul>
            <li>De forma gratuita, serão aceitos somente artigos em nome de pessoa física com seu nome na assinatura do texto;</li>
            <li>Não serão publicados artigos com foco publicitário ou em nome de empresas;</li>
            <li>Seu artigo não será publicado até ser revisado e aprovado;</li>
            <li>A revisão dos artigos serve única e exclusivamente para garantir que os assuntos sigam o padrão e tema deste site;</li>
            <li>A revisão não leva mais de 24 horas e passam por um fluxo antes de serem publicados, confira no final desta página;</li>
          </ul>
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DataIterator from '../components/lawyers/DataIterator'

export default {
  components: {
    DataIterator,
  },
  data: () => ({
    lawyers: [],
    keys: [
      {text: "Nome", value: "firstname"},
      {text: "Cidade", value: "address.city"},
      {text: "Estado", value: "address.country"},
    ],
  }),
  methods: {
    async getLawyers () {
      const options = {
      data: { profession: "Advogado" },
      projection: {password: 0, salt: 0}
      }
      try {
				const { data } = await this.$axios.get('/users', {params: options})
        this.lawyers = data;
			} catch (error) {
				console.error(error.message)
			}
    }
  },
  created () {
    this.getLawyers()
  }
}
</script>