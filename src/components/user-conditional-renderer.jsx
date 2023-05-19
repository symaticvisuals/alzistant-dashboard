import Cookies from "js-cookie";

const AdminRenderer = ({ trueComponent, falseComponent }) => {
    const profile = JSON.parse(Cookies.get('profile'));

    return profile?.role === "caretaker" ? trueComponent : falseComponent;
};

export default AdminRenderer;