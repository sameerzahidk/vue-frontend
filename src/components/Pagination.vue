<template>
  <div class="pagination">
    <button class="page-link" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
    <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
    <button class="page-link" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 5,
    },
  },
  computed: {
  totalPages() {
    return Math.ceil(this.items.length / this.pageSize);
  }
},
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.page-link {
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.page-link:disabled {
  cursor: not-allowed;
  background-color: #ddd;
}
</style>
