const vue = Vue.createApp({
    data() {
        return {
            gameInModal: { id: null, name: null, price: null },
            games: [],
            gameInfoModalInstance: null
        };
    },
    async created() {
        try {
            this.games = await (await fetch('http://localhost:8080/games')).json();
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    },
    methods: {
        async getGame(id) {
            try {
                this.gameInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json();

                if (!this.gameInfoModalInstance) {
                    this.gameInfoModalInstance = new bootstrap.Modal(document.getElementById('gameInfoModal'), {});
                }

                this.gameInfoModalInstance.show();
            } catch (error) {
                console.error('Error fetching game details:', error);
            }
        },
        closeModal() {
            if (this.gameInfoModalInstance) {
                this.gameInfoModalInstance.hide();
            }
        }
    }
}).mount('#app');
