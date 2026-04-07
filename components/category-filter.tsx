"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
}

export function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href="/"
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !activeCategory
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        Semua
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/?category=${category.slug}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === category.slug
              ? "text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
          style={
            activeCategory === category.slug
              ? { backgroundColor: category.color }
              : undefined
          }
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
