import { Route, Routes } from "react-router-dom";
import { Layouts } from "../layouts";
import { Views } from "../views";

export function MainRoutes(props){
    return (
        <Layouts.MainLayout>
            <Routes>
                <Route path="/paramettres/*" element={<Views.SettingsView />}/>
                <Route path="/demandes-entretien/:id" element={<Views.InterviewRequestShowView />}/>
                <Route path="/demandes-entretien" element={<Views.InterviewRequestListView />}/>
                <Route path="/recrutements" element={<Views.EmployeeListView />}/>
                <Route path="/recruteurs/:id/modifier" element={<Views.RecruiterEditView />}/>
                <Route path="/recruteurs/creer" element={<Views.RecruiterCreateView />}/>
                <Route path="/recruteurs" element={<Views.RecruiterListView />}/>
                <Route path="/candidats/:id/modifier" element={<Views.UserEditView />}/>
                <Route path="/candidats/:id" element={<Views.UserShowView />}/>
                <Route path="/candidats/creer" element={<Views.UserCreateView />}/>
                <Route path="/candidats-qualifies" element={<Views.UserQualifiedListView />}/>
                <Route path="/candidats" element={<Views.UserListView />}/>
                <Route path="/profil" element={<Views.ProfileView />}/>
                <Route path="/" element={<Views.DashboardView />}/>
            </Routes>
        </Layouts.MainLayout>
    )
}