export default function urlBuilder(route, id) {
    return route.replace(/:id/i, id);
}