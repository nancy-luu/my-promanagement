export function classNameHelper(...classes) {
    return classes.filter(Boolean).join(" ");
}