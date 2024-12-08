import React from 'react';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from '@nextui-org/react'
import { Sparkles } from 'lucide-react';

export const CustomNavbar = () => {
    return (
        <Navbar className="bg-transparent">
            <NavbarBrand>
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <p className="font-bold text-inherit ml-2">CompressWizard</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#" aria-current="page">
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Características
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Precios
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <Button color="warning" variant="flat">
                    Iniciar sesión
                </Button>
            </NavbarContent>
        </Navbar>
    );
};
