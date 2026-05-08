"use client"

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import React from "react"

type Variant =
    | "primary"
    | "outline"
    | "ghost"
    | "greenOutline"

type Size = "sm" | "md" | "lg"

type Props = {
    label: string
    icon?: React.ReactNode
    variant?: Variant
    size?: Size
    loading?: boolean
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    href?: string
    target?: "_self" | "_blank"

    // 👇 NEW
    hideLabelOnMobile?: boolean
}

const variants: Record<Variant, string> = {
    primary: "bg-[#51A46B] text-white border border-[#51A46B]",

    outline:
        "bg-transparent text-[#51A46B] border border-[#51A46B] hover:bg-[#51A46B] hover:text-white",

    ghost: "bg-transparent text-black",

    greenOutline:
        "bg-transparent text-[#51A46B] border border-[#51A46B]",
}

const sizes: Record<Size, string> = {
    sm: "px-3 py-1 text-[13px] md:text-[14px]",
    md: "px-3 md:px-4 py-2 text-[14px] md:text-[16px]",
    lg: "px-5 md:px-6 py-3 text-[16px] md:text-[18px]",
}

export default function CustomButton({
                                         label,
                                         icon,
                                         variant = "primary",
                                         size = "md",
                                         loading = false,
                                         disabled = false,
                                         onClick,
                                         href,
                                         target = "_self",
                                         hideLabelOnMobile = false,
                                     }: Props) {
    const isDisabled = disabled || loading

    const className = cn(
        "inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200",
        "w-auto",
        variants[variant],
        sizes[size],
        isDisabled && "opacity-50 cursor-not-allowed",
        hideLabelOnMobile && "px-2 md:px-4"
    )

    const content = (
        <>
            {loading ? (
                <Loader2 className="animate-spin" size={18} />
            ) : (
                icon && (
                    <span className="flex items-center shrink-0">
                        {icon}
                    </span>
                )
            )}

            <span
                className={cn(
                    "whitespace-nowrap",
                    hideLabelOnMobile && "hidden md:inline"
                )}
            >
                {label}
            </span>
        </>
    )

    if (href && !isDisabled) {
        return (
            <Link href={href} target={target} className={className}>
                {content}
            </Link>
        )
    }

    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            className={className}
        >
            {content}
        </button>
    )
}