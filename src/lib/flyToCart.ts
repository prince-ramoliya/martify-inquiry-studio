// Fly-to-cart animation: clones an image, animates it to the cart icon
export function flyToCart(sourceEl: HTMLElement | null) {
  if (typeof window === "undefined" || !sourceEl) return;
  const target = document.getElementById("cart-target");
  if (!target) return;

  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const clone = sourceEl.cloneNode(true) as HTMLElement;
  clone.style.position = "fixed";
  clone.style.left = `${sourceRect.left}px`;
  clone.style.top = `${sourceRect.top}px`;
  clone.style.width = `${sourceRect.width}px`;
  clone.style.height = `${sourceRect.height}px`;
  clone.style.margin = "0";
  clone.style.zIndex = "9999";
  clone.style.pointerEvents = "none";
  clone.style.borderRadius = "9999px";
  clone.style.transition = "all 0.85s cubic-bezier(0.4, 0, 0.2, 1)";
  clone.style.boxShadow = "0 12px 40px hsl(222 89% 38% / 0.4)";
  clone.style.objectFit = "cover";

  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    const tx = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
    const ty = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);
    clone.style.transform = `translate(${tx}px, ${ty}px) scale(0.1)`;
    clone.style.opacity = "0.4";
    clone.style.borderRadius = "9999px";
  });

  setTimeout(() => {
    clone.remove();
    target.classList.add("cart-bump");
    setTimeout(() => target.classList.remove("cart-bump"), 600);
  }, 850);
}
