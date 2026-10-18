import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Modernisum Shared Base Lightbulb Emblem (Single Source of Truth)
 * Borrowed by both Modernisum parent website and School (Vidhyam) OS.
 *
 * Theme Adaptability Architecture:
 * - Light Mode: 100% authentic original brand colors:
 *   - Rays & Interior Glow: #F1B01B (warm amber gold)
 *   - Bulb Contour & Screw Threads: #374550 (original charcoal slate, preserved intact)
 *   - Geometric 'M' Filament: #FFFFFF (pure white on dark contour)
 * - Dark Mode: Only in dark mode ("darbod"), adapt colors for crisp high-contrast visibility:
 *   - Bulb Contour & Screw Threads: dark:fill-slate-100 (luminous silver-white)
 *   - Geometric 'M' Filament: dark:fill-slate-900 (deep charcoal navy for 10:1 contrast on bright contour)
 */
export function ModernisumBulbBase({
  className = "w-full h-full",
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      {/* 1. Yellow Glow Interior & Sleek Futuristic Rays (Unchanged across themes) */}
      <path
        fill="#F1B01B"
        fillRule="evenodd"
        d="M 234.66 702.02 L 175.22 757.05 A 11.00 11.00 0 0 1 190.17 773.19 L 249.60 718.16 A 11.00 11.00 0 0 1 234.66 702.02 Z M 175.44 605.68 L 101.44 638.63 A 11.00 11.00 0 0 1 110.39 658.73 L 184.39 625.78 A 11.00 11.00 0 0 1 175.44 605.68 Z M 150.75 500.23 L 70.19 508.69 A 11.00 11.00 0 0 1 72.49 530.57 L 153.05 522.11 A 11.00 11.00 0 0 1 150.75 500.23 Z M 159.00 395.83 L 79.60 379.82 A 11.00 11.00 0 0 1 75.25 401.38 L 154.65 417.39 A 11.00 11.00 0 0 1 159.00 395.83 Z M 195.97 302.33 L 124.51 264.17 A 11.00 11.00 0 0 1 114.15 283.58 L 185.60 321.73 A 11.00 11.00 0 0 1 195.97 302.33 Z M 264.46 217.66 L 208.39 159.19 A 11.00 11.00 0 0 1 192.52 174.42 L 248.58 232.88 A 11.00 11.00 0 0 1 264.46 217.66 Z M 340.57 165.68 L 301.92 94.50 A 11.00 11.00 0 0 1 282.59 104.99 L 321.24 176.18 A 11.00 11.00 0 0 1 340.57 165.68 Z M 424.15 136.36 L 404.83 57.70 A 11.00 11.00 0 0 1 383.46 62.95 L 402.78 141.61 A 11.00 11.00 0 0 1 424.15 136.36 Z M 507.00 129.00 L 507.00 48.00 A 11.00 11.00 0 0 1 485.00 48.00 L 485.00 129.00 A 11.00 11.00 0 0 1 507.00 129.00 Z M 589.22 141.61 L 608.54 62.95 A 11.00 11.00 0 0 1 587.17 57.70 L 567.85 136.36 A 11.00 11.00 0 0 1 589.22 141.61 Z M 670.76 176.18 L 709.41 104.99 A 11.00 11.00 0 0 1 690.08 94.50 L 651.43 165.68 A 11.00 11.00 0 0 1 670.76 176.18 Z M 743.42 232.88 L 799.48 174.42 A 11.00 11.00 0 0 1 783.61 159.19 L 727.54 217.66 A 11.00 11.00 0 0 1 743.42 232.88 Z M 806.40 321.73 L 877.85 283.58 A 11.00 11.00 0 0 1 867.49 264.17 L 796.03 302.33 A 11.00 11.00 0 0 1 806.40 321.73 Z M 837.35 417.39 L 916.75 401.38 A 11.00 11.00 0 0 1 912.40 379.82 L 833.00 395.83 A 11.00 11.00 0 0 1 837.35 417.39 Z M 838.95 522.11 L 919.51 530.57 A 11.00 11.00 0 0 1 921.81 508.69 L 841.25 500.23 A 11.00 11.00 0 0 1 838.95 522.11 Z M 807.61 625.78 L 881.61 658.73 A 11.00 11.00 0 0 1 890.56 638.63 L 816.56 605.68 A 11.00 11.00 0 0 1 807.61 625.78 Z M 742.40 718.16 L 801.83 773.19 A 11.00 11.00 0 0 1 816.78 757.05 L 757.34 702.02 A 11.00 11.00 0 0 1 742.40 718.16 Z M 472.5 220.618 C 445.153 224.432, 425.671 229.769, 404.242 239.321 C 384.921 247.932, 365.815 260.188, 348.5 275.076 C 337.409 284.612, 328.56 293.734, 319.457 305.012 C 310.912 315.6, 307.1 321.104, 300.535 332.332 C 285.24 358.492, 275.641 386.606, 271.498 417.372 C 270.126 427.558, 269.867 434.841, 270.254 452.368 C 270.661 470.803, 271.189 476.838, 273.417 488.5 C 276.937 506.927, 283.75 527.133, 292.099 543.905 C 303.231 566.268, 311.469 577.94, 333.557 602.648 C 361.564 633.977, 379.29 671.759, 385.398 713.149 C 386.181 718.456, 387.296 723.685, 387.876 724.769 C 388.456 725.853, 390.477 727.473, 392.367 728.37 C 395.135 729.684, 399.195 730.0, 413.279 730.0 C 427.014 730.0, 431.003 729.701, 431.914 728.604 L 578.7 730.0 C 598.64 730.0, 602.089 729.17, 604.409 723.805 C 605.195 721.987, 606.562 715.714, 607.448 709.864 C 612.481 676.607, 625.347 645.49, 644.921 619.229 C 648.089 614.978, 655.545 606.1, 661.489 599.5 C 672.948 586.777, 682.849 573.927, 689.9 562.625 C 701.248 544.435, 711.543 519.837, 716.32 499.5 C 720.734 480.708, 722.091 468.293, 722.07 446.887 C 722.047 424.589, 720.087 408.632, 714.962 389.034 C 711.139 374.411, 707.125 363.396, 700.558 349.5 C 676.156 297.864, 631.237 256.107, 577.0 234.638 C 570.675 232.135, 560.325 228.762, 554.0 227.144 C 532.312 221.595, 525.296 220.734, 499.5 220.458 C 486.3 220.316, 474.15 220.388, 472.5 220.618 Z"
      />

      {/* 2. Dark Slate Bulb Contour, Filament Base & Screw Thread
          Light Mode: Authentic #374550 (unchanged)
          Dark Mode: Luminous silver-white (dark:fill-slate-100) */}
      <path
        fill="#374550"
        className="fill-[#374550] dark:fill-slate-100 transition-colors duration-200"
        fillRule="evenodd"
        d="M 475 176.606 C 473.075 176.835, 467.675 177.481, 463 178.041 C 446.023 180.075, 424.888 184.912, 408.366 190.545 C 382.197 199.465, 350.764 217.016, 327.970 235.434 C 322.762 239.642, 312.953 248.579, 306.174 255.293 C 286.827 274.454, 273.192 292.036, 261.054 313.473 C 248.579 335.507, 239.962 357.165, 234.085 381.258 C 230.178 397.275, 228.334 408.498, 226.897 425 C 225.637 439.475, 226.161 465.655, 227.999 480 C 231.553 507.734, 240.389 537.007, 252.904 562.500 C 264.943 587.024, 279.651 608.107, 301.391 632 C 312.106 643.776, 320.241 655.486, 326.747 668.500 C 335.719 686.448, 339.641 699.809, 342.455 722.016 C 343.817 732.763, 344.595 735.643, 348.049 742.714 C 353.425 753.720, 362.009 762.496, 372.124 767.326 C 376.181 769.263, 382.170 771.333, 385.434 771.924 C 393.752 773.432, 598.378 773.417, 606.542 771.908 C 619.179 769.572, 631.556 761.684, 639.483 750.915 C 641.899 747.634, 644.824 742.413, 645.984 739.313 C 647.144 736.214, 648.712 728.680, 649.470 722.573 C 652.050 701.777, 656.273 687.291, 664.943 669.500 C 670.616 657.857, 678.887 645.193, 685.947 637.336 C 687.844 635.226, 692.834 629.675, 697.038 625 C 716.624 603.219, 734.463 575.543, 744.987 550.611 C 754.168 528.863, 760.027 507.755, 763.683 483.264 C 764.980 474.575, 765.441 465.226, 765.446 447.500 C 765.454 416.518, 763.347 400.533, 755.494 372 C 751.252 356.586, 745.712 342.247, 738.059 326.875 C 730.167 311.023, 723.358 299.936, 713.011 286.096 C 682.605 245.423, 640.147 212.783, 593.441 194.176 C 575.991 187.223, 554.323 181.510, 533.545 178.381 C 523.958 176.937, 482.721 175.687, 475 176.606 M 477.500 219.614 C 457.899 221.657, 434.699 226.845, 419 232.695 C 397.055 240.872, 371.969 255.190, 353.615 270.012 C 343.151 278.462, 328.063 293.543, 319.659 303.952 C 294.219 335.461, 277.455 373.547, 271.565 413.219 C 269.284 428.576, 268.554 451.447, 269.884 465.806 C 271.447 482.672, 275.390 502.166, 280.137 516.500 C 285.153 531.644, 296.818 555.504, 305.559 568.500 C 312.233 578.424, 327.070 597.155, 330.517 600.012 C 334.050 602.939, 345.843 617.726, 352.342 627.378 C 355.979 632.781, 361.652 642.668, 364.948 649.350 C 374.898 669.524, 380.508 687.178, 384.525 710.966 C 386.636 723.467, 387.022 724.631, 389.915 727.216 L 393.032 730 413.016 730 L 433 730 433 654.682 C 433 571.676, 433.157 573.939, 426.741 564.360 C 424.958 561.699, 421.363 557.943, 418.750 556.013 L 414 552.504 414 531.143 L 414 509.783 416.750 510.467 C 422.421 511.877, 432.708 516.444, 438.690 520.209 C 442.095 522.351, 448.418 527.841, 452.742 532.408 C 458.359 538.343, 461.805 543.109, 464.815 549.107 C 467.132 553.723, 470.020 561.100, 471.234 565.500 C 473.408 573.382, 473.445 574.650, 473.766 651.750 L 474.091 730 496.045 730 L 518 730 518.020 655.750 C 518.032 611.279, 518.444 578.704, 519.047 574.529 C 520.485 564.581, 524.986 552.294, 530.341 543.702 C 535.951 534.702, 547.502 523.495, 556.156 518.655 C 562.214 515.268, 574.913 510, 577.023 510 C 577.629 510, 578 518.343, 578 532 C 578 549.876, 577.745 554, 576.641 554 C 575.893 554, 573.210 555.824, 570.678 558.053 C 567.820 560.568, 564.826 564.638, 562.787 568.781 L 559.500 575.456 559.232 652.728 L 558.964 730 579.082 730 L 599.200 730 602.432 726.750 C 605.390 723.775, 605.813 722.526, 607.417 712 C 610.900 689.156, 617.774 667.225, 627.321 648.500 C 634.129 635.148, 646.141 617.427, 655.452 607 C 676.845 583.042, 686.055 570.794, 695.686 553.500 C 698.443 548.550, 702.329 540.871, 704.322 536.435 C 712.980 517.163, 719.570 491.957, 722.083 468.500 C 723.662 453.769, 722.688 425.917, 720.065 410.745 C 715.704 385.523, 710.012 367.780, 699.299 346.016 C 692.270 331.736, 682.082 315.874, 671.788 303.185 C 663.912 293.476, 650.971 280.505, 639.988 271.311 C 621.721 256.019, 595.972 241.188, 572.741 232.578 C 560.381 227.996, 543.451 223.619, 529.981 221.522 C 519.928 219.957, 486.030 218.725, 477.500 219.614 M 368.759 800.423 C 363.562 802.278, 360.539 804.413, 357.705 808.229 C 354.777 812.172, 353 817.174, 353 821.471 C 353 831.388, 360.676 840.926, 370.330 843.006 C 374.018 843.801, 411.051 844.031, 499.500 843.810 C 612.948 843.526, 623.755 843.358, 626.500 841.835 C 633.557 837.919, 639 829.170, 639 821.740 C 639 815.939, 636.623 810.568, 632 805.925 C 628.769 802.679, 626.088 801.008, 622.779 800.175 C 619.328 799.306, 586.168 799.011, 495.307 799.044 C 395.505 799.080, 371.799 799.338, 368.759 800.423 M 371.500 870.491 C 370.950 870.675, 369.236 871.105, 367.691 871.446 C 366.146 871.788, 362.878 873.915, 360.428 876.173 C 357.094 879.246, 355.576 881.649, 354.389 885.735 C 353.315 889.430, 353.027 892.693, 353.498 895.833 C 354.368 901.638, 355.957 904.742, 360.157 908.850 C 366.782 915.327, 360.689 915.066, 498.571 914.769 C 613.311 914.522, 623.750 914.363, 626.561 912.822 C 631.413 910.162, 635.780 905.094, 637.455 900.178 C 639.418 894.417, 639.406 890.548, 637.407 884.681 C 635.393 878.770, 628.709 872.668, 622.549 871.117 C 619.395 870.322, 582.658 870.023, 495.307 870.079 C 427.763 870.122, 372.050 870.308, 371.500 870.491 M 413 945.840 C 413 952.192, 416.680 964.579, 421.078 973.034 C 427.869 986.086, 441.523 999.267, 455.500 1006.264 C 463.353 1010.195, 475.625 1013.691, 486.250 1015.024 C 493.923 1015.986, 498.077 1015.987, 505.750 1015.029 C 518.499 1013.437, 531.570 1009.175, 541.500 1003.373 C 551.299 997.647, 564.195 985.036, 569.394 976.096 C 574.138 967.938, 577.917 956.694, 578.687 948.447 L 579.289 942 496.145 942 L 413 942 413 945.840"
      />

      {/* 3. Pure Solid Geometric 'M' Filament Core
          Light Mode: Authentic pure white (#FFFFFF on dark contour)
          Dark Mode: Deep dark navy (#0f172a on luminous silver-white contour) */}
      <path
        fill="#FFFFFF"
        className="fill-white dark:fill-slate-900 transition-colors duration-200"
        fillRule="evenodd"
        d="M 368.50 308.00 H 405.00 Q 413.00 308.00 417.80 314.40 L 491.20 415.30 Q 496.00 421.70 500.80 415.30 L 574.20 314.40 Q 579.00 308.00 587.00 308.00 H 623.50 Q 631.50 308.00 631.50 316.00 V 572.00 Q 631.50 580.00 623.50 580.00 H 587.00 Q 579.00 580.00 579.00 572.00 V 389.00 L 500.80 492.10 Q 496.00 498.50 491.20 492.10 L 413.00 389.00 V 572.00 Q 413.00 580.00 405.00 580.00 H 368.50 Q 360.50 580.00 360.50 572.00 V 316.00 Q 360.50 308.00 368.50 308.00 Z"
      />

      {/* 4. Overlays (Student Graduation Cap or vertical specific decorators) */}
      {children}
    </svg>
  );
}

/**
 * Modernisum Official Parent Logo
 * Borrows directly from ModernisumBulbBase with 0 duplicate geometry.
 */
export function ModernisumLogo({ className = "w-10 h-10", size }: LogoProps) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <div className={`shrink-0 inline-flex items-center justify-center ${className}`} style={style}>
      <ModernisumBulbBase className="w-full h-full" />
    </div>
  );
}

/**
 * Agromi Agro-Tech Vector Emblem
 * Official 3-Leaf Sprout emblem.
 * Pure inline SVG code: 0 HTTP requests.
 */
export function AgromiLogo({ className = "w-10 h-10", size }: LogoProps) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="agro-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="agro-leaf-bright" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="agro-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Canopy Container */}
      <rect x="6" y="6" width="88" height="88" rx="22" className="fill-emerald-950/60 stroke-emerald-500/30 dark:stroke-emerald-400/40" strokeWidth="2.5" />

      {/* Central Stem */}
      <path
        d="M50 78 C50 56 50 42 50 30"
        stroke="url(#agro-green-grad)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Left Leaf */}
      <path
        d="M50 52 C36 50 26 40 28 26 C42 24 50 36 50 52 Z"
        fill="url(#agro-leaf-bright)"
        filter="url(#agro-glow)"
      />

      {/* Right Leaf */}
      <path
        d="M50 44 C64 42 74 32 72 18 C58 16 50 28 50 44 Z"
        fill="url(#agro-green-grad)"
        filter="url(#agro-glow)"
      />

      {/* Root Baseline Energy */}
      <circle cx="50" cy="78" r="3.5" fill="#34D399" />
    </svg>
  );
}

/**
 * ModSchool Official Emblem (Bulb with Graduation Cap & 'M' Filament)
 * Provided by user:
 * - Dark Mode: /images/modschool-logo-dark.png (cyan/blue illuminated bulb with graduation cap)
 * - Light Mode: /images/modschool-logo-light.png (crisp dark mortarboard cap on glowing bulb)
 */
export function SchoolLogo({ className = "w-10 h-10", size }: LogoProps) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <div className={`relative shrink-0 flex items-center justify-center select-none ${className}`} style={style}>
      {/* Light Mode ModSchool Logo */}
      <img
        src="/images/modschool-logo-light.png"
        alt="ModSchool Logo"
        width={500}
        height={500}
        className="w-full h-full object-contain dark:hidden pointer-events-none drop-shadow-[0_2px_8px_rgba(14,165,233,0.25)]"
        loading="eager"
        decoding="async"
      />
      {/* Dark Mode ModSchool Logo */}
      <img
        src="/images/modschool-logo-dark.png"
        alt="ModSchool Logo"
        width={500}
        height={500}
        className="w-full h-full object-contain hidden dark:block pointer-events-none drop-shadow-[0_0_14px_rgba(56,189,248,0.45)]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export function SchoolLogoLight({ className = "w-10 h-10", size }: LogoProps) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <div className={`relative shrink-0 flex items-center justify-center select-none ${className}`} style={style}>
      <img
        src="/images/modschool-logo-light.png"
        alt="ModSchool Logo"
        width={500}
        height={500}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_8px_rgba(14,165,233,0.25)]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export function SchoolLogoDark({ className = "w-10 h-10", size }: LogoProps) {
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;
  return (
    <div className={`relative shrink-0 flex items-center justify-center select-none ${className}`} style={style}>
      <img
        src="/images/modschool-logo-dark.png"
        alt="ModSchool Logo"
        width={500}
        height={500}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_14px_rgba(56,189,248,0.45)]"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}

export const ModSchoolLogo = SchoolLogo;
export const VidhyamLogo = SchoolLogo;
export const AgroLogo = AgromiLogo;



