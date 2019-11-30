<template>
  <img :class="$style.root" :style="styleObject" />
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
export default class Resize extends Vue {
  @Prop({ type: Number })
  barSize!: number;
  @Prop({ type: Number })
  size!: number;
  @Prop({ type: Boolean })
  barOpen!: boolean;
  @Prop({ type: String })
  type!: string;

  private styleObject: Partial<CSSStyleDeclaration> = {};
  mounted() {
    this.update();
  }
  beforeUpdate() {
    this.update();
  }

  update() {
    this.styleObject = {
      width: this.size + "px",
      height: this.size + "px",
      marginTop: this.size / 2 + "px",
      marginLeft: -this.size / 2 + "px"
    };

    if (this.type === "ns" || this.type === "sn") {
      this.styleObject.transform = "rotate(90deg)";
    }
    if (!this.barOpen) {
      switch (this.type) {
        case "we":
          this.styleObject.marginLeft = -(this.size - this.barSize) / 2 + "px";
          break;
        case "ew":
          this.styleObject.marginLeft = -(this.size + this.barSize) / 2 + "px";
          break;
        case "ns":
          this.styleObject.marginTop = -(this.size - this.barSize) / 2 + "px";
          break;
        case "sn":
          this.styleObject.marginTop = -(this.size + this.barSize) / 2 + "px";
          break;
      }
    }
  }
}
</script>
<style lang="scss" module>
.root {
  position: absolute;
  box-sizing: border-box;

  top: 50%;
  left: 50%;
  cursor: pointer;
  overflow: visible;
  background-color: rgba(255, 255, 255, 0.8);
  border: solid 1px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  &:hover {
    background-color: rgba(200, 200, 255, 0.8);
  }
}
</style>
