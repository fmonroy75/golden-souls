<template>

<v-container>

<v-row>

<v-col
v-for="p in products"
:key="p.id"
md="4"
>

<ProductCard :product="p"/>

</v-col>

</v-row>

</v-container>

</template>

<script setup>

import { ref,onMounted } from "vue"
import { collection,getDocs } from "firebase/firestore"

import { db } from "@/firebase/firebase"

import ProductCard from "@/components/ProductCard.vue"

const products=ref([])

onMounted(async()=>{

const snap = await getDocs(collection(db,"products"))

products.value = snap.docs.map(doc=>({

id:doc.id,
...doc.data()

}))

})

</script>