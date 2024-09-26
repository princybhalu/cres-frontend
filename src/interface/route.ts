export interface RouteConfig {
    path: string;
    component: React.ComponentType<any>;
    protected: boolean;
    layout: boolean;
}