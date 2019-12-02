<template>
  <div :class="$style.root">
    <div
      ref="child1"
      :class="$style.child"
      @click="
        activeStop = false;
        onBarOpen(false);
      "
    >
      <slot name="main"/>
    </div>
    <div ref="child0" :class="$style.child" @click="activeStop = true">
      <slot name="sub"/>
    </div>
    <Bar
      :parentStyle="$style"
      :activeMode="activeMode"
      :open="barOpen"
      :type="type"
      :size="bold"
      :pos="pos"
      @onMove="onBarMove"
      @onOpen="onBarOpen"
    >
    </Bar>
  </div>
</template>

<script lang="ts">
import ResizeObserver from "resize-observer-polyfill";
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import Bar from "./Bar.vue";
@Component({
  components: { Bar }
})
export default class SplitView extends Vue {
  $style!: { [key: string]: string };
  @Prop({ type: String, default: "ew" })
  private type!: string;
  @Prop({ type: Number, default: 10 })
  private bold!: number;
  @Prop({ type: Number, default: 200 })
  private pos!: number;
  @Prop({ type: Number, default: 3000 })
  private activeWait!: number;
  @Prop({ type: Number, default: -1 })
  private activeSize!: number;
  @Ref()
  private child0!: HTMLDivElement;
  @Ref()
  private child1!: HTMLDivElement;
  private barOpen: boolean = true;
  private activeMode: boolean = false;
  private barPos!: number;
  private activeStop: boolean = false;
  private closeHandle?: unknown;
  private layoutHandle?: NodeJS.Timeout | number;
  private resizeObserver?: ResizeObserver;
  private mounted() {
    this.barPos = this.pos;

    //リサイズ処理
    this.resizeObserver = new ResizeObserver(() => {
      this.layout();
    });
    this.resizeObserver.observe(this.$el);
    this.update();
  }
  private beforeUpdate() {
    this.update();
  }
  private beforeDestroy() {
    //リサイズ処理の解除
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }
  protected layout() {
    if (!this.layoutHandle) {
      this.layoutHandle = setTimeout(() => {
        this.layoutHandle = undefined;
        this.update();
      }, 1);
    }
  }
  @Watch("barOpen")
  @Watch("activeMode")
  protected update() {
    let activeMode = false;
    let pos = this.barPos;
    const rootRef = this.$el as HTMLElement;
    const children = [this.child0, this.child1];
    const barSize = this.bold;
    const barType = this.type;
    const width = rootRef.offsetWidth;
    const height = rootRef.offsetHeight;

    //アクティブバーの処理
    if (this.activeSize! > -1) {
      if (barType === "we" || barType === "ew") {
        const w = width - (pos + barSize);
        if (w < this.activeSize!) {
          activeMode = true;
          if (!this.activeMode) {
            children[1].style.animation =
              this.$style.DrawerMax + " 0.5s ease 0s forwards";
          }
        }
      } else {
        const h = height - (pos + barSize);
        if (h < this.activeSize!) {
          activeMode = true;
          if (!this.activeMode) {
            children[1].style.animation =
              this.$style.DrawerMax + " 0.5s ease 0s forwards";
          }
        }
      }
      if (activeMode !== this.activeMode) {
        this.activeMode = activeMode;
        if (!activeMode) {
          this.onBarOpen(true);
          children[1].style.animation =
            this.$style.DrawerNormal + " 0.5s ease 0s normal";
        }
        this.closeBar();
      }
    }

    switch (barType) {
      case "we":
        children[0].style.left = "0";
        children[0].style.right = "auto";
        children[0].style.width = pos + "px";
        children[0].style.height = "auto";
        children[0].style.top = "0";
        children[0].style.bottom = "0";
        if (!activeMode) {
          children[1].style.left = pos + barSize + "px";
          children[1].style.right = "0";
          children[1].style.width = "auto";
          children[1].style.height = "auto";
          children[1].style.top = "0";
          children[1].style.bottom = "0";
        }
        break;
      case "ew":
        children[0].style.left = "auto";
        children[0].style.right = "0";
        children[0].style.width = pos + "px";
        children[0].style.height = "auto";
        children[0].style.top = "0";
        children[0].style.bottom = "0";
        if (!activeMode) {
          children[1].style.left = "0";
          children[1].style.right = pos + barSize + "px";
          children[1].style.width = "auto";
          children[1].style.height = "auto";
          children[1].style.top = "0";
          children[1].style.bottom = "0";
        }
        break;
      case "ns":
        children[0].style.top = "0";
        children[0].style.bottom = "auto";
        children[0].style.width = "auto";
        children[0].style.height = pos + "px";
        children[0].style.left = "0";
        children[0].style.right = "0";
        if (!activeMode) {
          children[1].style.top = pos + barSize + "px";
          children[1].style.bottom = "0";
          children[1].style.width = "auto";
          children[1].style.height = "auto";
          children[1].style.left = "0";
          children[1].style.right = "0";
        }
        break;
      case "sn":
        children[0].style.top = "auto";
        children[0].style.bottom = "0";
        children[0].style.width = "auto";
        children[0].style.height = pos + "px";
        children[0].style.left = "0";
        children[0].style.right = "0";
        if (!activeMode) {
          children[1].style.top = "0";
          children[1].style.bottom = pos + barSize + "px";
          children[1].style.width = "auto";
          children[1].style.height = "auto";
          children[1].style.left = "0";
          children[1].style.right = "0";
        }
        break;
    }
  }
  protected onBarOpen(open: boolean) {
    if (!this.activeMode) return;
    const children = [this.child0, this.child1];
    if (open) {
      children[0].style.animation =
        this.$style[this.type + "DrawerShow"] + " 0.5s ease 0s normal";
    } else {
      children[0].style.animation =
        this.$style[this.type + "DrawerClose"] + " 0.5s ease 0s forwards";
    }
    this.barOpen = open;
  }
  protected onBarMove(pos: number) {
    this.barPos = pos;
    this.closeBar();
    this.update();
  }
  public closeBar() {
    if (this.activeMode && !this.activeStop) {
      if (this.closeHandle) {
        clearTimeout(this.closeHandle as number);
      }
      this.closeHandle = setTimeout(() => {
        if (this.activeMode && !this.activeStop) this.onBarOpen(false);
        this.closeHandle = undefined;
      }, this.activeWait!);
    }
  }
}
</script>
<style lang="scss" module>
.child {
  position: absolute;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  width: atuo;
  height: atuo;
}

.root {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
@keyframes nsDrawerShow {
  0% {
    top: 0;
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes nsDrawerClose {
  0% {
    transform: translateY(0);
  }

  100% {
    top: 0;
    transform: translateY(-100%);
  }
}

@keyframes snDrawerShow {
  0% {
    bottom: 0;
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes snDrawerClose {
  0% {
    transform: translateY(0);
  }

  100% {
    bottom: 0;
    transform: translateY(100%);
  }
}

@keyframes weDrawerShow {
  0% {
    left: 0;
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes weDrawerClose {
  0% {
    transform: translateX(0);
  }

  100% {
    left: 0;
    transform: translateX(-100%);
  }
}

@keyframes ewDrawerShow {
  0% {
    transform: translateX(100%);
    right: 0;
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes ewDrawerClose {
  0% {
    transform: translateX(0);
  }

  100% {
    right: 0;
    transform: translateX(100%);
  }
}

@keyframes DrawerMax {
  0% {
  }

  100% {
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }
}
@keyframes DrawerNormal {
  0% {
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }

  100% {
  }
}
</style>
