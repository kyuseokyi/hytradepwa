<template>
    <div>
        <div class="row">
            <div class="col-md-3 d-none d-lg-block d-xl-none d-xl-block">
                <slot name="left"></slot>
            </div>
            <div class="col">
                <div class="d-block d-sm-none d-none d-sm-block d-md-block d-lg-none">
                    <slot name="section-dropdown"></slot>
                </div>
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BaseLayout"
    }
</script>

<style scoped>

</style>
