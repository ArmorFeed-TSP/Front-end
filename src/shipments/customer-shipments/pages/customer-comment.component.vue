<template>
  <div>
    <div class="card">
      <pv-tool-bar class="mb-4">
        <template #start>
          <pv-button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
        </template>
      </pv-tool-bar>
      <pv-scroll-panel
        class="scroll-comment"
        style="width: 40rem; height: 170px"
      >
        <pv-card v-for="comment in comments" class="card-comment">
          <template #title>
            {{ comment.title }}
          </template>
          <template #content>
            {{ comment.content }}
          </template>
        </pv-card>
      </pv-scroll-panel>
      <pv-dialog
        v-model:visible="commentDialog"
        :style="{ width: '450px' }"
        header="New Review"
        :modal="true"
        class="p-fluid"
      >
        <div class="field mt-3">
          <label for="title">Title</label>
          <span class="p-float-label">
            <pv-input-text
              class="p-inputtext-sm"
              type="text"
              id="title"
              v-model.trim="comment.title"
              required="true"
              autofocus
              :class="{ 'p-invalid': submitted && !comment.title }"
            />

            <small class="p-error" v-if="submitted && !comment.title"
              >Title is required</small
            >
          </span>
        </div>
        <div class="field">
          <label for="content">Content</label>
          <span class="p-float-label">
            <pv-input-text
              class="p-inputtext-lg"
              type="textarea"
              id="description"
              v-model="comment.content"
              required="false"
              rows="2"
              cols="20"
            />
          </span>
        </div>

        <template #footer>
          <pv-button
            :label="'Cancel'.toUpperCase()"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
          />
          <pv-button
            :label="'Save'.toUpperCase()"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveComment"
          />
        </template>
      </pv-dialog>
    </div>
  </div>
</template>

<script>
import { CommentsApiService } from "../service/comments-api.service";
import { FilterMatchMode } from "primevue/api";
export default {
  name: "comment-list",
  data() {
    return {
      comments: [],
      commentDialog: false,
      deleteCommentDialog: false,
      deleteCommentsDialog: false,
      comment: {},
      filters: {},
      submitted: false,
      commentsService: null,
      selectedComments: null,
    };
  },
  created() {
    this.commentsService = new CommentsApiService();
    this.commentsService.getAll().then((response) => {
      this.comments = response.data;
      this.comments.forEach((comment) => this.getDisplayableComment(comment));
      console.log("created");
    });
    this.initFilters();
  },
  methods: {
    getDisplayableComment(comment) {
      comment.id = this.comment.id;
      return comment;
    },
    getStorableComment(displayableComment) {
      return {
        id: displayableComment.id,
        title: displayableComment.title,
        content: displayableComment.content,
      };
    },
    openNew() {
      this.comment = {};
      this.submitted = false;
      this.commentDialog = true;
    },
    hideDialog() {
      this.commentDialog = false;
      this.submitted = false;
    },
    findIndexById(id) {
      return this.comments.findIndex((comment) => comment.id === id);
    },
    saveComment() {
      this.submitted = true;
      if (this.comment.title.trim()) {
        if (this.comment.id) {
          this.comment = this.getStorableComment(this.comment);
          this.commentsService
            .update(this.comment.id, this.comment)
            .then((response) => {
              this.comments[this.findIndexById(response.data.id)] =
                this.getDisplayableComment(response.data);
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "comment Updated",
                life: 3000,
              });
              console.log(response);
            });
        } else {
          this.comment.id = 0;
          console.log(this.comment);
          this.comment = this.getStorableComment(this.comment);
          this.commentsService.create(this.comment).then((response) => {
            this.comment = this.getDisplayableComment(response.data);
            this.comments.push(this.comment);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "comment Created",
              life: 3000,
            });
            console.log(response);
          });
        }
        this.commentDialog = false;
        this.comment = {};
      }
    },

    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>

<style scoped></style>
