export function useChartTheme() {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')

  const tickColor = computed(() => (isDark.value ? '#94a3b8' : '#64748b'))
  const legendColor = computed(() => (isDark.value ? '#cbd5e1' : '#475569'))
  const gridColor = computed(() => (isDark.value ? 'rgba(42, 53, 72, 0.6)' : 'rgba(226, 232, 240, 0.8)'))

  return { isDark, tickColor, legendColor, gridColor }
}
