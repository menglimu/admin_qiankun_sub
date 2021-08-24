import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // // tslint:disable no-empty-interface
    // type Element = VNode;
    // // tslint:disable no-empty-interface
    // type ElementClass = Vue;
    // interface IntrinsicElements {
    //   [elem: string]: any;
    // }

    type Element = VNode;
    // interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
