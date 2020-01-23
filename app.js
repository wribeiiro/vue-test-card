import CardComponent from './CardComponent.js';

const App = new Vue({
    el: '#app',
    components: {
        CardComponent
    },
    data() {
        return {
            template: ``,
        }
    },
    created() {

    },
    mounted() {
        setInterval(this.getData, 2000);
    },
    methods: {
        async getData() {
            await axios
            .get('http://192.168.15.14/projetos/webservice-2.0/teste1?token=f79894ec511dc00a98489b495fa48d2d')
            .then((response) => {
                console.log('requesta maquina')

                const arrayData = response.data.data.data;

                let strTemplate = ``;

                for (let index = 0; index < arrayData.length; index++) {

                    strTemplate += `
                        <div class="col-md-3"> 
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top" src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title text-center">[${arrayData[index].CODMAQ}] - ${arrayData[index].descri}</h5>
                                </div>
                                <div class="card-body">
                                    <div class="row form-group">
                                        <span class="text-center center-block">PROGRESSO</span>
                                        <div class="progress" style="width: 100% !important">
                                            <div class="progress-bar" role="progressbar" style="width: ${arrayData[index].PEROEE}%;" aria-valuenow="${arrayData[index].PEROEE}" aria-valuemin="0" aria-valuemax="100">${arrayData[index].PEROEE}%</div>
                                        </div>
                                    </div>
                                    <div class="row text-center">
                                        <div class="col-md-6">
                                            <span style="font-size: 12px">OEE</span> <br> ${arrayData[index].PEROEE}
                                        </div>
                                        <div class="col-md-6">
                                            <span style="font-size: 12px">PERFORMANCE</span> <br> ${arrayData[index].PERDIS}
                                        </div>
                                        <div class="col-md-6">
                                            <span style="font-size: 12px">DISPONIBILIDADE</span> <br> ${arrayData[index].PERPER}
                                        </div>
                                        <div class="col-md-6">
                                            <span style="font-size: 12px">QUALIDADE</span> <br> ${arrayData[index].PERQUA}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }

                this.template = strTemplate;
            }); 
        },
        render (ce) {
            return ce('div', this.template)
        }
    }
})