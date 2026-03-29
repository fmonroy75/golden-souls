import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
    state: () => ({
        items: []
    }),
    getters: {
        totalPrice: (state) =>
            state.items.reduce((total, item) => total + (item.price * item.qty), 0),
            
        totalItems: (state) =>
            state.items.reduce((total, item) => total + item.qty, 0)
    },
    actions: {
        add(product) {
            const item = this.items.find(i => i.id === product.id)
            if (item) {
                item.qty++
            } else {
                this.items.push({ ...product, qty: 1 })
            }
        },
        remove(id) {
            this.items = this.items.filter(i => i.id !== id)
        },
        decrease(id) {
            const item = this.items.find(i => i.id === id)
            if (item) {
                if (item.qty > 1) {
                    item.qty--
                } else {
                    this.remove(id)
                }
            }
        },
        clear() {
            this.items = []
        }
    }
})