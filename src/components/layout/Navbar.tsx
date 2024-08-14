"use client";
import { MenuIcon, User2, XIcon } from "lucide-react";
import CustomNavigationMenu from "./NavigationMenu";
import { Modal } from "../common/modal";
import SignInForm from "../form/SignInForm";
import SignUpForm from "../form/SignUpForm";
import { useAuthModal } from "../../context/auth-modal-wrapper";
import ForgotPasswordForm from "../form/ForgotPasswordForm";
import OTPForm from "../form/OTPForm";
import ProfileDropdownMenu from "../common/ProfileDropdownMenu";
import ResetPasswordForm from "../form/ResetPasswordForm";
import React, { useState } from "react";
import { Link, Input } from "@nextui-org/react";
import { useSession } from "../form/auth-wrapper";
import { ShoppingCartIcon } from "lucide-react";
import { SearchOutlined } from "@ant-design/icons";

export default function App() {
  const session = useSession();
  const { modalState, openModal, closeModal } = useAuthModal();
  const [isOpen, setIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center h-[4rem] px-4 sm:px-[2rem]">
        {/* Logo */}
        <div>
          <img
            src="https://res.cloudinary.com/ddmxsbxn6/image/upload/v1719601380/pricewards-logo-removebg-preview_pklmye.png"
            alt="ACME Logo"
            className="object-cover h-full w-[8rem] sm:w-[12rem]"
          />
        </div>

        {/* Menu button for small screens */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XIcon className="h-6 w-6 text-black" />
            ) : (
              <MenuIcon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>

        {/* Links for larger screens */}
        <div className="hidden sm:flex justify-center items-center space-x-4">
          <button className="w-[120px] sm:w-[156px] border rounded-md border-white m-3 font-bold hover:bg-accent">
            <Link href="/custom-clothing" className="text-sm text-black">
              Custom Clothing
            </Link>
          </button>
          <CustomNavigationMenu />
          <button className="w-[120px] sm:w-[156px] border rounded-md border-white m-3 font-bold hover:bg-accent">
            <Link href="/faq" className="text-sm text-black">
              FAQ
            </Link>
          </button>
        </div>

        {/* Right-side icons */}
        <div className="flex justify-end items-center space-x-4 w-[20rem]">
          {!searchIsOpen && (
            <button className="" onClick={() => setSearchIsOpen(true)}>
              <SearchOutlined className="pt-1" style={{ fontSize: '24px' }}/> 
            </button>
          )}
          {searchIsOpen && (
            <Input
              className="px-3 focus:ring focus:ring-white"
              classNames={{
                base: "max-w-full sm:max-w-[300px] h-8", // Change max-w to desired width
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              autoFocus
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
              onBlur={() => setSearchIsOpen(false)}
            />
          )}

          <Link href="/cart" className="px-3 text-black">
            <ShoppingCartIcon className="h-6 w-6 text-black-500" />
          </Link>
          {!session && (
            <button
              onClick={() => {
                openModal("signin");
                closeModal("signup");
                closeModal("otp");
                closeModal("forgotPassword");
                closeModal("resetPassword");
                setIsOpen(true);
              }}
            >
              <User2 className="h-6 w-6 text-black-500" />
            </button>
          )}
          {session && (
            <div className="hidden sm:block">
              <ProfileDropdownMenu />
            </div>
          )}
        </div>
      </div>

      {/* Dropdown menu for mobile */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-4 bg-gray-100 py-4">
          <Link href="/custom-clothing" className="text-sm text-black">
            Custom Clothing
          </Link>
          <CustomNavigationMenu />
          <Link href="/faq" className="text-sm text-black">
            FAQ
          </Link>
          {session && <ProfileDropdownMenu />}
        </div>
      )}

      {/* Auth modal */}
      <Modal
        open={isOpen}
        setOpen={setIsOpen}
        className={modalState.signup ? "max-w-xl" : "max-w-md"}
      >
        {modalState.signin && <SignInForm setIsOpen={setIsOpen} />}
        {modalState.signup && <SignUpForm />}
        {modalState.forgotPassword && <ForgotPasswordForm />}
        {modalState.otp && <OTPForm />}
        {modalState.resetPassword && <ResetPasswordForm />}
      </Modal>
    </>
  );
}

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="true"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);
