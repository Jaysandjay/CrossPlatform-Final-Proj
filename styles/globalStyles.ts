import { StyleSheet } from 'react-native';

// ============================================
// COLOR PALETTE
// ============================================
export const colors = {
  // Primary colors
  primary: '#3b82f6',      // Blue
  primaryDark: '#2563eb',
  primaryLight: '#60a5fa',

  // Secondary colors
  secondary: '#007AFF',

  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  danger: '#ff3b30',

  // Neutral colors
  white: '#ffffff',
  black: '#000000',

  // Grays
  gray50: '#f9f9f9',
  gray100: '#f5f5f5',
  gray200: '#eeeeee',
  gray300: '#e0e0e0',
  gray400: '#cccccc',
  gray500: '#999999',
  gray600: '#666666',
  gray700: '#4a4a4a',
  gray800: '#333333',
  gray900: '#1a1a1a',

  // Backgrounds
  background: '#F2F2F7',
  backgroundLight: '#ffffff',
  backgroundGray: '#f0f0f0',

  // Text colors
  textPrimary: '#000000',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textLight: '#ffffff',

  // Borders
  border: '#cccccc',
  borderLight: '#e0e0e0',
};

// ============================================
// TYPOGRAPHY
// ============================================
export const typography = {
  // Font sizes
  fontSizeXS: 10,
  fontSizeSM: 12,
  fontSizeMD: 14,
  fontSizeBase: 16,
  fontSizeLG: 18,
  fontSizeXL: 20,
  fontSize2XL: 24,
  fontSize3XL: 32,

  // Font weights
  fontWeightNormal: '400' as const,
  fontWeightMedium: '500' as const,
  fontWeightSemiBold: '600' as const,
  fontWeightBold: '700' as const,
};

// ============================================
// SPACING
// ============================================
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

// ============================================
// BORDER RADIUS
// ============================================
export const borderRadius = {
  sm: 4,
  md: 6,
  base: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// ============================================
// SHADOWS
// ============================================
export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

// ============================================
// WEB-SPECIFIC STYLES (for HTML elements)
// ============================================
export const webStyles = {
  dateInput: {
    padding: spacing.md,
    fontSize: typography.fontSizeBase,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.base,
    marginBottom: spacing.base,
    backgroundColor: colors.backgroundLight,
  },
};

// ============================================
// GLOBAL COMPONENT STYLES
// ============================================
export const globalStyles = StyleSheet.create({
  // ===== CONTAINERS =====
  container: {
    flex: 1,
    padding: spacing.base,
    backgroundColor: colors.backgroundLight,
  },

  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundLight,
  },

  containerGray: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ===== CARDS =====
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.medium,
  },

  cardLarge: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.base,
    ...shadows.medium,
  },

  cardWithShadow: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.base,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // ===== CARD TEXT ELEMENTS =====
  cardTitle: {
    fontSize: typography.fontSizeLG,
    fontWeight: typography.fontWeightSemiBold,
    marginBottom: spacing.md,
    color: colors.gray800,
  },

  cardSubtitle: {
    fontSize: typography.fontSizeMD,
    color: colors.gray600,
    marginTop: 5,
  },

  cardText: {
    fontSize: typography.fontSizeBase,
    color: colors.gray800,
    lineHeight: 22,
  },

  cardTextItalic: {
    fontSize: typography.fontSizeBase,
    fontStyle: 'italic',
    marginBottom: 5,
  },

  placeholderText: {
    color: colors.gray600,
    fontSize: typography.fontSizeMD,
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },

  // ===== TEXT INPUTS =====
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.base,
    padding: spacing.md,
    marginBottom: spacing.base,
    fontSize: typography.fontSizeBase,
    backgroundColor: colors.backgroundLight,
  },

  inputGray: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: typography.fontSizeBase,
    backgroundColor: colors.gray50,
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  // ===== LABELS =====
  label: {
    fontSize: typography.fontSizeMD,
    fontWeight: typography.fontWeightSemiBold,
    marginBottom: 6,
    color: colors.textPrimary,
  },

  labelSecondary: {
    fontSize: typography.fontSizeMD,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },

  // ===== BUTTONS =====
  button: {
    paddingVertical: 14,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonSecondary: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonGray: {
    backgroundColor: colors.backgroundGray,
    paddingVertical: 14,
    paddingHorizontal: spacing.base,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  buttonCancel: {
    flex: 1,
    backgroundColor: colors.backgroundGray,
    padding: 14,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  buttonSave: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: borderRadius.base,
    alignItems: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: 10,
  },

  // ===== BUTTON TEXT =====
  buttonText: {
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightSemiBold,
  },

  buttonTextPrimary: {
    color: colors.white,
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightSemiBold,
  },

  buttonTextSecondary: {
    color: colors.white,
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightSemiBold,
  },

  buttonTextOutline: {
    color: colors.textPrimary,
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightSemiBold,
  },

  buttonTextGray: {
    color: colors.textSecondary,
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightSemiBold,
  },

  // ===== TYPOGRAPHY =====
  title: {
    fontSize: typography.fontSize3XL,
    fontWeight: typography.fontWeightBold,
    textAlign: 'center',
    marginBottom: spacing.xxxl,
    color: colors.secondary,
  },

  titleLarge: {
    fontSize: typography.fontSize3XL,
    fontWeight: typography.fontWeightBold,
    color: colors.textPrimary,
  },

  heading: {
    fontSize: typography.fontSize2XL,
    fontWeight: typography.fontWeightBold,
    marginBottom: spacing.base,
    color: colors.textPrimary,
  },

  subheading: {
    fontSize: typography.fontSizeLG,
    fontWeight: typography.fontWeightSemiBold,
    marginBottom: spacing.sm,
    color: colors.textPrimary,
  },

  bodyText: {
    fontSize: typography.fontSizeBase,
    color: colors.textPrimary,
    lineHeight: 24,
  },

  bodyTextSecondary: {
    fontSize: typography.fontSizeMD,
    color: colors.textSecondary,
  },

  smallText: {
    fontSize: typography.fontSizeSM,
    color: colors.textTertiary,
  },

  // ===== LISTS =====
  listContent: {
    padding: 15,
  },

  // ===== CATEGORY ITEMS =====
  categoryItem: {
    padding: spacing.md,
    backgroundColor: colors.gray200,
    marginBottom: 4,
    borderRadius: borderRadius.md,
  },

  // ===== FLOATING ACTION BUTTON =====
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderRadius: borderRadius.full,
    ...shadows.large,
  },

  fabText: {
    color: colors.white,
    fontWeight: typography.fontWeightSemiBold,
    fontSize: typography.fontSizeBase,
  },

  // ===== EMPTY STATE =====
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  emptyStateText: {
    fontSize: typography.fontSizeLG,
    fontWeight: typography.fontWeightSemiBold,
    color: colors.gray600,
    marginTop: spacing.base,
  },

  emptyStateSubtext: {
    fontSize: typography.fontSizeMD,
    color: colors.gray500,
    marginTop: spacing.sm,
    textAlign: 'center',
  },

  // ===== LEGEND / BREAKDOWN ITEMS =====
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  legendColor: {
    width: 16,
    height: 16,
    borderRadius: borderRadius.base,
    marginRight: 10,
  },

  legendInfo: {
    flex: 1,
  },

  legendText: {
    fontSize: typography.fontSizeMD,
    color: colors.gray800,
  },

  legendPercentage: {
    fontSize: typography.fontSizeSM,
    color: colors.gray600,
  },

  legendAmount: {
    fontSize: typography.fontSizeMD,
    fontWeight: typography.fontWeightSemiBold,
    color: colors.gray800,
  },

  // ===== HEADER WITH ICON =====
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  headerTitle: {
    fontSize: typography.fontSizeLG,
    fontWeight: typography.fontWeightSemiBold,
    marginLeft: spacing.sm,
  },

  // ===== PROGRESS BAR =====
  progressBarBackground: {
    height: 24,
    backgroundColor: colors.gray200,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: 10,
  },

  progressBarFill: {
    height: '100%',
    borderRadius: borderRadius.lg,
  },

  // ===== EXPENSE ITEM SPECIFIC =====
  expenseItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginBottom: spacing.md,
    ...shadows.medium,
  },

  expenseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },

  expenseDetails: {
    flex: 1,
  },

  categoryName: {
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightSemiBold,
    marginBottom: 4,
  },

  description: {
    fontSize: typography.fontSizeMD,
    color: colors.gray600,
    marginBottom: 2,
  },

  date: {
    fontSize: typography.fontSizeSM,
    color: colors.gray500,
  },

  amountContainer: {
    alignItems: 'flex-end',
  },

  amount: {
    fontSize: typography.fontSizeLG,
    fontWeight: typography.fontWeightBold,
    color: colors.secondary,
  },

  amountLarge: {
    fontSize: 36,
    fontWeight: typography.fontWeightBold,
    color: colors.secondary,
    marginVertical: spacing.sm,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 10,
  },

  actionButton: {
    padding: spacing.sm,
    marginLeft: spacing.md,
  },

  // ===== BUDGET SPECIFIC =====
  progressContainer: {
    marginTop: 10,
  },

  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  budgetText: {
    fontSize: typography.fontSizeMD,
    color: colors.gray800,
  },

  budgetPercentage: {
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightSemiBold,
  },

  budgetStatus: {
    fontSize: typography.fontSizeMD,
    fontWeight: typography.fontWeightSemiBold,
    marginBottom: 5,
  },

  budgetRemaining: {
    fontSize: typography.fontSizeSM,
    color: colors.gray600,
  },
});

// Export everything as a single object for convenience
export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  globalStyles,
  webStyles,
};
