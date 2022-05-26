<template>
  <div>
    <div class="card">
      <pv-tool-bar class="mb-4">
        <template #start>
          <pv-button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
          />
        </template>
      </pv-tool-bar>
      <pv-scroll-panel
        class="scroll-comment"
        style="width: 40rem; height: 170px"
      >
        <pv-card>
          <template #title> </template>
          <template #content> </template>
        </pv-card>
      </pv-scroll-panel>
      <pv-dialog
        :style="{ width: '450px' }"
        header="New Review"
        :modal="true"
        class="p-fluid"
      >
        <div class="field mt-3">
          <label for="title">Title</label>
          <span class="p-float-label">
            <pv-input-text class="p-inputtext-sm" type="text" autofocus />
          </span>
        </div>
        <div class="field">
          <label for="content">Content</label>
          <span class="p-float-label">
            <pv-input-text
              class="p-inputtext-lg"
              type="textarea"
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
          />
          <pv-button
            :label="'Save'.toUpperCase()"
            icon="pi pi-check"
            class="p-button-text"
          />
        </template>
      </pv-dialog>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
