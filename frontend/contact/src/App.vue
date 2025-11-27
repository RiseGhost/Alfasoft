<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const contacts = ref([])
const showPopup = ref(false)

const newContact = ref({
  name: "",
  contact: "",
  email: "",
  image: null
})

onMounted(async () => {
  console.log("MOUNTED!")
  try {
    const response = await axios.get("https://josesantos-nodejs.recruitment.alfasoft.pt/contacts")
    contacts.value = JSON.parse(response.data.data)
  } catch (err) {
    if (err.response?.data?.error) {
      alert("Erro do backend: " + err.response.data.error)
    } else {
      alert("Erro inesperado: " + err.message)
    }
  }
})

const handleImage = (event) => {
  newContact.value.image = event.target.files[0]
}

const createContact = async () => {
  try {
    const formData = new FormData()
    formData.append("image", newContact.value.image)
    formData.append("name", newContact.value.name)
    formData.append("email", newContact.value.email)
    formData.append("phone", newContact.value.contact)

    const uploadRes = await axios.post(
      "http://127.0.0.1:10093/creatContact",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    )

    newContact.value.image = ""
    newContact.value.contact = ""
    newContact.value.email = ""
    newContact.value.name = ""

    alert(uploadRes.data.msg)
    showPopup.value = false
  } catch (err) {
    console.error("Erro ao criar contacto:", err)

    if (err.response?.data?.error) {
      alert("Erro do backend: " + err.response.data.error)
    } else {
      alert("Erro inesperado: " + err.message)
    }
  }
}

</script>

<template>
  <h1>Contacts</h1>

  <!-- Botão para abrir popup -->
  <button @click="showPopup = true" class="create-btn">Criar contacto</button>

  <!-- POPUP -->
  <div v-if="showPopup" class="popup-overlay">
    <div class="popup">
      <h2>New Contact</h2>

      <label>Name:</label>
      <input type="text" v-model="newContact.name" />

      <label>Phone Number:</label>
      <input type="text" v-model="newContact.contact" />

      <label>Email:</label>
      <input type="email" v-model="newContact.email" />

      <label>Photo:</label>
      <input type="file" @change="handleImage" accept="image/*" />

      <div class="popup-buttons">
        <button @click="createContact">Criar</button>
        <button @click="showPopup = false">Cancelar</button>
      </div>
    </div>
  </div>

  <!-- CONTACT CARDS -->
  <div class="cards">
    <div v-for="c in contacts" :key="c.id" class="card">
      <img
        class="avatar"
        :src="c.picture || 'https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png'"
        alt="foto"
      />
      <h2>{{ c.name }}</h2>
      <p><strong>Telefone:</strong> {{ c.contact }}</p>
      <p><strong>Email:</strong> {{ c.email }}</p>
    </div>
  </div>
</template>

<style>
html{
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>

<style scoped>
h1{
  text-align: center;
}

.create-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 350px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.popup input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.popup-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin: auto;
}

.card {
  padding: 15px;
  border-radius: 10px;
  background: #f5f5f5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}
</style>
