<template>
  <div :class="$style.root" style="{this.props.style!}">
    <div ref="child0" :class="$style.child">
      ああああ
    </div>
    <div ref="child1" :class="$style.child">
      いいいい
    </div>
    <Bar
      :activeMode="activeMode"
      :open="barOpen"
      :type="type"
      :size="bold"
      :pos="pos"
      @onMove="onBarMove"
      @onOpen="onBarOpen"
    >
      <!-- procOpen={open => this.onOpen(open)}
      procMove={pos => this.onMove(pos)} -->
    </Bar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import Bar from "./Bar.vue";
@Component({
  components: { Bar }
})
export default class SplitView extends Vue {
  @Prop({ type: String, default: "ew" })
  private type!: string;
  @Prop({ type: Number, default: 16 })
  private bold!: number;
  @Prop({ type: Number, default: 200 })
  private pos!: number;
  @Prop({ type: Number, default: 3000 })
  private activeWait!: number;
  @Prop({ type: Number, default: 300 })
  private activeSize!: number;
  private style = {};
  private barOpen: boolean = true;
  private activeMode: boolean = false;
  @Ref()
  private child0!: HTMLDivElement;
  @Ref()
  private child1!: HTMLDivElement;
  private mounted() {
    console.log(this.child0);
  }

  protected onBarOpen(open: boolean) {
    // const children = [this.childRef[0].current!, this.childRef[1].current!];
    // if (open) {
    //   children[0].style.animation =
    //     this.props.type + "DrawerShow 0.5s ease 0s normal";
    // } else {
    //   children[0].style.animation =
    //     this.props.type + "DrawerClose 0.5s ease 0s forwards";
    // }
    // this.setState({ barOpen: open });
  }
  protected onBarMove(pos: number) {
    // this.pos = pos;
    this.closeBar();
  }
  public closeBar() {
    //   if (this.activeMode && !this.activeStop) {
    //     if (this.closeHandle) {
    //       clearTimeout(this.closeHandle);
    //     }
    //     this.closeHandle = setTimeout(() => {
    //       if (this.state.activeMode && !this.activeStop) this.onOpen(false);
    //       this.closeHandle = undefined;
    //     }, this.props.activeWait!);
    //   }
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
  background-color: red;
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

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
}
</style>
