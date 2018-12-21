<template>
    <b-col md="6"  class="d-inline-block my-1">
        <b-form-group horizontal label="Filter" class="mb-0">
            <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" @input="$emit('filterSearch', filter)" />
                <b-input-group-append>
                    <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-append>
            </b-input-group>
        </b-form-group>
    </b-col>
</template>

<script>
    export default {
        name: "eventFilter",
        data: () => ({
            filter: null
        })
    }
</script>

<style scoped>

</style>
