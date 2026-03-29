<template>

<v-file-input
label="Imagen"
@change="upload"
/>

</template>

<script setup>

import { storage } from "@/firebase/firebase"

import { ref as sRef, uploadBytes, getDownloadURL }
from "firebase/storage"

const emit = defineEmits(["uploaded"])

async function upload(file){

const ref = sRef(storage,"products/"+file.name)

await uploadBytes(ref,file)

const url = await getDownloadURL(ref)

emit("uploaded",url)

}

</script>