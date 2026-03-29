import { defineStore } from "pinia"
import { db } from "@/firebase/firebase"
import { collection, getDocs } from "firebase/firestore"

export const useProductStore = defineStore("products", {

    state: () => ({

        products: [],
        categories: [],
        selectedCategory: null

    }),

    actions: {

        async loadProducts() {

            const snapshot = await getDocs(collection(db, "products"))

            this.products = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

        },

        async loadCategories() {

            const snapshot = await getDocs(collection(db, "categories"))

            this.categories = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

        }

    },

    getters: {

        filteredProducts: (state) => {

            if (!state.selectedCategory) return state.products

            return state.products.filter(p =>
                p.category_id === state.selectedCategory)

        }

    }

})