export type BrandItem = {
  id: string;
  title: string;
  image: string;       // main texture
  imageHi?: string;    // optional high-res
  href?: string;       // open on click
  tint?: string;       // optional overlay tint
};

export const BRAND_ITEMS: BrandItem[] = [
  { id: "a", title: "Case Study A", image: "/placeholder.svg", href: "/work/a" },
  { id: "b", title: "Case Study B", image: "/placeholder.svg", href: "/work/b" },
  { id: "c", title: "Case Study C", image: "/placeholder.svg", href: "/work/c" },
  { id: "d", title: "Case Study D", image: "/placeholder.svg", href: "/work/d" },
  { id: "e", title: "Case Study E", image: "/placeholder.svg", href: "/work/e" },
  { id: "f", title: "Case Study F", image: "/placeholder.svg", href: "/work/f" },
  { id: "g", title: "Case Study G", image: "/placeholder.svg", href: "/work/g" },
  { id: "h", title: "Case Study H", image: "/placeholder.svg", href: "/work/h" },
  { id: "i", title: "Case Study I", image: "/placeholder.svg", href: "/work/i" },
];
