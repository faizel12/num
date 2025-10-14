import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface SimpleEthiopianDatePickerProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: Date) => void;
}

// Ethiopian date utilities - included in the same file
// const EthiopianDateUtils = {
  // Convert Gregorian to Ethiopian date
//   gregorianToEthiopian: (date: Date): { year: number; month: number; day: number } => {
//     const gregDate = new Date(date);
//     const gregYear = gregDate.getFullYear();
//     const gregMonth = gregDate.getMonth() + 1;
//     const gregDay = gregDate.getDate();

//     // Ethiopian calendar starts 7-8 years behind Gregorian
//     const ethiopianYear = gregYear - 8;
    
//     // Determine Ethiopian month and day based on Gregorian date
//     let ethiopianMonth, ethiopianDay;
    
//     if (gregMonth < 9 || (gregMonth === 9 && gregDay < 11)) {
//       // Before Ethiopian New Year (September 11)
//       ethiopianMonth = (gregMonth + 3) % 13 || 13;
//       ethiopianDay = EthiopianDateUtils.calculateEthiopianDay(gregMonth, gregDay, false);
//     } else {
//       // After Ethiopian New Year
//       ethiopianMonth = gregMonth - 8;
//       ethiopianDay = EthiopianDateUtils.calculateEthiopianDay(gregMonth, gregDay, true);
//     }

//     // Handle day overflow
//     if (ethiopianDay > 30 && ethiopianMonth !== 13) {
//       ethiopianDay = ethiopianDay - 30;
//       ethiopianMonth++;
//     }

//     // Handle Pagume (13th month) - 5 or 6 days
//     if (ethiopianMonth === 13 && ethiopianDay > 6) {
//       ethiopianMonth = 1;
//       ethiopianDay = 1;
//     }

//     return {
//       year: ethiopianYear,
//       month: ethiopianMonth,
//       day: ethiopianDay
//     };
//   },
// Ethiopian date utilities - included in the same file
const EthiopianDateUtils = {
    // Convert Gregorian to Ethiopian date
    gregorianToEthiopian: (date: Date): { year: number; month: number; day: number } => {
      const gregDate = new Date(date);
      const gregYear = gregDate.getFullYear();
      const gregMonth = gregDate.getMonth() + 1;
      const gregDay = gregDate.getDate();
  
      // SIMPLIFIED: Ethiopian calendar is approximately 7-8 years behind
      // Let's use a fixed offset that gives us 2016 for 2024
      const ethiopianYear = gregYear - 7;
      
      // Determine Ethiopian month and day based on Gregorian date
      let ethiopianMonth, ethiopianDay;
      
      if (gregMonth < 9 || (gregMonth === 9 && gregDay < 11)) {
        // Before Ethiopian New Year (September 11)
        ethiopianMonth = (gregMonth + 3) % 13 || 13;
        ethiopianDay = Math.max(1, (gregDay + 20) % 30 || 30);
      } else {
        // After Ethiopian New Year
        ethiopianMonth = gregMonth - 7;
        ethiopianDay = Math.max(1, gregDay - 10);
      }
  
      // Handle day overflow
      if (ethiopianDay > 30 && ethiopianMonth !== 13) {
        ethiopianDay = ethiopianDay - 30;
        ethiopianMonth++;
      }
  
      // Handle Pagume (13th month) - 5 or 6 days
      if (ethiopianMonth === 13 && ethiopianDay > 6) {
        ethiopianMonth = 1;
        ethiopianDay = 1;
      }
  
      console.log('Gregorian:', { gregYear, gregMonth, gregDay });
      console.log('Ethiopian:', { ethiopianYear, ethiopianMonth, ethiopianDay });
  
      return {
        year: ethiopianYear,
        month: ethiopianMonth,
        day: ethiopianDay
      };
    },
  
    // Convert Ethiopian to Gregorian date (simplified)
    ethiopianToGregorian: (ethYear: number, ethMonth: number, ethDay: number): Date => {
      // Reverse calculation
      const gregYear = ethYear + 7;
      let gregMonth, gregDay;
  
      if (ethMonth <= 4) {
        // Meskerem to Tir (September to January)
        gregMonth = ethMonth + 8;
        gregDay = ethDay + 10;
      } else {
        // Yekatit to Pagume (February to September)
        gregMonth = ethMonth - 4;
        gregDay = ethDay;
      }
  
      // Handle month overflow
      if (gregMonth > 12) {
        gregMonth = gregMonth - 12;
      }
  
      // Handle day overflow (simplified)
      const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (gregDay > monthDays[gregMonth - 1]) {
        gregDay = gregDay - monthDays[gregMonth - 1];
        gregMonth++;
        
        if (gregMonth > 12) {
          gregMonth = 1;
        }
      }
  
      return new Date(gregYear, gregMonth - 1, gregDay);
    },
  
    // ... rest of the functions remain the same

  // Calculate Ethiopian day (simplified)
  calculateEthiopianDay: (month: number, day: number, isAfterNewYear: boolean): number => {
    if (isAfterNewYear) {
      // After Ethiopian New Year (Sept 11)
      return Math.max(1, day - 10);
    } else {
      // Before Ethiopian New Year - simplified calculation
      return (day + 20) % 30 || 30;
    }
  },

//   // Convert Ethiopian to Gregorian date (simplified)
//   ethiopianToGregorian: (ethYear: number, ethMonth: number, ethDay: number): Date => {
//     // Simplified conversion for demo purposes
//     const gregYear = ethYear + 8;
//     let gregMonth, gregDay;

//     if (ethMonth <= 4) {
//       // Meskerem to Tir (September to January)
//       gregMonth = ethMonth + 8;
//       gregDay = ethDay + 10;
//     } else {
//       // Yekatit to Pagume (February to September)
//       gregMonth = ethMonth - 4;
//       gregDay = ethDay;
//     }

//     // Handle month overflow
//     if (gregMonth > 12) {
//       gregMonth = gregMonth - 12;
//       // Note: In reality, year would increment here
//     }

//     // Handle day overflow (simplified)
//     const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//     if (gregDay > monthDays[gregMonth - 1]) {
//       gregDay = gregDay - monthDays[gregMonth - 1];
//       gregMonth++;
      
//       if (gregMonth > 12) {
//         gregMonth = 1;
//         // Note: Year would increment here in real conversion
//       }
//     }

//     return new Date(gregYear, gregMonth - 1, gregDay);
//   },

  // Get current Ethiopian date
  getCurrentEthiopianDate: () => {
    return EthiopianDateUtils.gregorianToEthiopian(new Date());
  },

  // Format Ethiopian date as string
  formatEthiopianDate: (ethDate: { year: number; month: number; day: number }): string => {
    const monthNames = [
      'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት',
      'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሃሴ', 'ጷጉሜን'
    ];
    
    const monthName = monthNames[ethDate.month - 1] || `Month ${ethDate.month}`;
    return `${ethDate.day} ${monthName} ${ethDate.year}`;
  }
};

const SimpleEthiopianDatePicker: React.FC<SimpleEthiopianDatePickerProps> = ({
  visible,
  onClose,
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = useState<{year: number, month: number, day: number}>({
    year: 2018,
    month: 1,
    day: 1
  });
  const [todayDate, setTodayDate] = useState<{year: number, month: number, day: number}>({
    year: 2018,
    month: 1,
    day: 1
  });

  // Set current Ethiopian date when component becomes visible
  useEffect(() => {
    if (visible) {
      const currentEthDate = EthiopianDateUtils.getCurrentEthiopianDate();
      setCurrentDate(currentEthDate);
      setTodayDate(currentEthDate);
      console.log('Current Ethiopian date:', currentEthDate);
    }
  }, [visible]);

  const ethiopianMonths = [
    'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት',
    'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሃሴ', 'ጷጉሜን'
  ];

  const generateDays = (month: number) => {
    const days = [];
    // Ethiopian months have 30 days except Pagume (13th) which has 5-6 days
    const totalDays = month === 13 ? 6 : 30;
    
    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }
    return days;
  };

  const handleDateSelect = (day: number) => {
    try {
      console.log('Selected Ethiopian date:', {
        year: currentDate.year,
        month: currentDate.month,
        day: day
      });

      // Convert Ethiopian date to Gregorian
      const gregorianDate = EthiopianDateUtils.ethiopianToGregorian(
        currentDate.year,
        currentDate.month,
        day
      );

      console.log('Converted to Gregorian:', gregorianDate);
      
      onDateSelect(gregorianDate);
      onClose();
    } catch (error) {
      console.error('Error selecting date:', error);
      // Fallback: use current date
      onDateSelect(new Date());
      onClose();
    }
  };

  const changeMonth = (increment: number) => {
    let newMonth = currentDate.month + increment;
    let newYear = currentDate.year;

    if (newMonth > 13) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 13;
      newYear--;
    }

    setCurrentDate({
      year: newYear,
      month: newMonth,
      day: 1
    });
  };

  const goToToday = () => {
    const todayEth = EthiopianDateUtils.getCurrentEthiopianDate();
    setCurrentDate(todayEth);
  };

  const isToday = (day: number) => {
    return currentDate.year === todayDate.year && 
           currentDate.month === todayDate.month && 
           day === todayDate.day;
  };

  if (!visible) return null;

  const days = generateDays(currentDate.month);
  const isCurrentMonthToday = currentDate.year === todayDate.year && currentDate.month === todayDate.month;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>📅 Select Ethiopian Date</Text>
          
          {/* Today's Date Display */}
          <View style={styles.todayContainer}>
            <Text style={styles.todayText}>
              Today: {EthiopianDateUtils.formatEthiopianDate(todayDate)}
            </Text>
            <TouchableOpacity style={styles.todayButton} onPress={goToToday}>
              <Text style={styles.todayButtonText}>Go to Today</Text>
            </TouchableOpacity>
          </View>

          {/* Month/Year Navigation */}
          <View style={styles.navigation}>
            <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
              <Ionicons name="chevron-back" size={20} color="#0A1931" />
            </TouchableOpacity>
            
            <View style={styles.monthYear}>
              <Text style={styles.monthYearText}>
                {ethiopianMonths[currentDate.month - 1]} {currentDate.year}
              </Text>
              {isCurrentMonthToday && (
                <Text style={styles.currentMonthText}>(Current Month)</Text>
              )}
            </View>
            
            <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
              <Ionicons name="chevron-forward" size={20} color="#0A1931" />
            </TouchableOpacity>
          </View>

          {/* Days Grid */}
          <ScrollView style={styles.daysContainer}>
            <View style={styles.daysGrid}>
              {days.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    isToday(day) && styles.todayButtonStyle
                  ]}
                  onPress={() => handleDateSelect(day)}
                >
                  <Text style={[
                    styles.dayText,
                    isToday(day) && styles.todayTextStyle
                  ]}>
                    {day}
                  </Text>
                  {isToday(day) && (
                    <Text style={styles.todayIndicator}>Today</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a2b4d',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '85%',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#FFD700',
  },
  todayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2d3e5d',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  todayText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  todayButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  todayButtonText: {
    color: '#0A1931',
    fontSize: 12,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#2d3e5d',
    padding: 12,
    borderRadius: 8,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 8,
  },
  monthYear: {
    flex: 1,
    alignItems: 'center',
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  currentMonthText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 2,
  },
  daysContainer: {
    maxHeight: 300,
    marginBottom: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 4,
  },
  dayButton: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3e5d',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3d4e6d',
  },
  todayButtonStyle: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
    transform: [{ scale: 1.1 }],
  },
  dayText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  todayTextStyle: {
    color: '#0A1931',
    fontWeight: 'bold',
  },
  todayIndicator: {
    position: 'absolute',
    bottom: 2,
    fontSize: 8,
    color: '#0A1931',
    fontWeight: 'bold',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#3d4e6d',
    paddingTop: 16,
  },
  closeButton: {
    padding: 14,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SimpleEthiopianDatePicker;