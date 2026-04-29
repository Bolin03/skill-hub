// App.tsx - Main application with routing and providers
// Design: Linear/Notion style - clean, minimal, professional
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SkillProvider } from "./contexts/SkillContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import PopularPage from "./pages/PopularPage";
import SkillDetailPage from "./pages/SkillDetailPage";
import DashboardPage from "./pages/DashboardPage";

function Router() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/search" component={SearchPage} />
          <Route path="/popular" component={PopularPage} />
          <Route path="/skill/:id" component={SkillDetailPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <SkillProvider>
            <TooltipProvider>
              <Toaster position="top-right" />
              <Router />
            </TooltipProvider>
          </SkillProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
