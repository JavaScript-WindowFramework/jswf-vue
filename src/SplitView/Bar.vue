<template>
  <div
    :class="$style.root"
    :style="styleObject"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
  >
    <Resize size="32" :barSize="size" :type="type" src="./images/resize.svg" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { Manager, MEvent, MovePoint } from "@jswf/manager";
import Resize from "./Resize.vue";

@Component({
  components: { Resize }
})
export default class Bar extends Vue {
  @Prop({ type: Number })
  private pos!: number;
  @Prop({ type: Number })
  private size!: number;
  @Prop({ type: String })
  private type!: "ns" | "sn" | "we" | "ew";
  @Prop({ type: Boolean })
  private open!: boolean;
  @Prop({ type: Boolean })
  private activeMode!: boolean;

  private barPos!: number;
  private styleObject: Partial<CSSStyleDeclaration> = {};
  mounted() {
    this.barPos = this.pos;
    this.$el.addEventListener("move", this.onMove.bind(this));
    this.update();
  }
  beforeDestory() {
    this.$el.removeEventListener("move", this.onMove.bind(this));
  }
  beforeUpdate() {
    this.update();
  }

  update() {
    switch (this.type) {
      case "we":
        this.styleObject = {
          top: 0 + "px",
          bottom: 0 + "px",
          left: this.barPos + "px",
          right: undefined,
          width: this.size + "px",
          cursor: "ew-resize",
          paddingLeft: "2px"
        };
        break;
      case "ew":
        this.styleObject = {
          top: 0 + "px",
          bottom: 0 + "px",
          right: this.barPos + "px",
          left: undefined,
          width: this.size + "px",
          cursor: "ew-resize",
          paddingLeft: "2px"
        };
        break;
      case "ns":
        this.styleObject = {
          left: 0 + "px",
          right: 0 + "px",
          top: this.barPos + "px",
          bottom: undefined,
          height: this.size + "px",
          paddingTop: "px",
          cursor: "ns-resize"
        };
        break;
      case "sn":
        this.styleObject = {
          left: 0 + "px",
          right: 0 + "px",
          top: undefined,
          bottom: this.barPos + "px",
          height: this.size + "px",
          paddingTop: "px",
          cursor: "ns-resize"
        };
        break;
    }

    if (!this.open) {
      const node = this.$el as HTMLElement;
      node.style.animation = this.type + "DrawerClose 0.5s ease 0s forwards";
      this.open = false;
    } else if (this.open) {
      const node = this.$el as HTMLElement;
      node.style.animation = this.type + "DrawerShow 0.5s ease 0s normal";
      this.open = true;
    }
  }
  protected onMove(e: MEvent) {
    let p = e.params as MovePoint;
    let pos = this.barPos;
    switch (this.type!) {
      case "we":
        pos = p.nodePoint.x + (p.nowPoint.x - p.basePoint.x);
        break;
      case "ew":
        pos = p.nodePoint.x - (p.nowPoint.x - p.basePoint.x);
        break;
      case "ns":
        pos = p.nodePoint.y + p.nowPoint.y - p.basePoint.y;
        break;
      case "sn":
        pos = p.nodePoint.y - (p.nowPoint.y - p.basePoint.y);
        break;
    }
    this.barPos = pos;
    this.$forceUpdate();
    this.$emit("onMove", pos);
    //this.closeBar();
  }
  protected onMouseDown(e: MouseEvent) {
    if (Manager.moveNode == null) {
      const node = this.$el as HTMLElement;
      Manager.moveNode = node;
      let p = Manager.getPos((e as unknown) as MouseEvent | TouchEvent);
      Manager.baseX = p.x;
      Manager.baseY = p.y;
      Manager.nodeX = this.barPos;
      Manager.nodeY = this.barPos;
      Manager.nodeWidth = node.offsetWidth;
      Manager.nodeHeight = node.offsetHeight;
    }
    //  this.$emit("onMove", this.barPos);
    e.stopPropagation();
    this.$emit("onMove", this.barPos);
  }
}
</script>
<style lang="scss" module>
.root {
  position: absolute;
  overflow: visible;
  box-sizing: border-box;
  background-color: #bbbbbb;
  border: outset 2px #b8b7b7;
  user-select: none;
  vertical-align: middle;
  &:active {
    background-color: #cccccc;
  }
}
</style>
