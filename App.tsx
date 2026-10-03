import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  location: string;
  initials: string;
  color: string;
};

type RootStackParamList = {
  Home: undefined;
  Directory: undefined;
  EmployeeDetails: { employee: Employee };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const employees: Employee[] = [
  {
    id: '1',
    name: 'Amara Okafor',
    role: 'Product Designer',
    department: 'Design',
    email: 'amara.okafor@example.com',
    location: 'San Francisco, CA',
    initials: 'AO',
    color: '#DCE9FF',
  },
  {
    id: '2',
    name: 'Leo Martin',
    role: 'Software Engineer',
    department: 'Engineering',
    email: 'leo.martin@example.com',
    location: 'Austin, TX',
    initials: 'LM',
    color: '#FCE4D6',
  },
  {
    id: '3',
    name: 'Sofia Chen',
    role: 'People Partner',
    department: 'People',
    email: 'sofia.chen@example.com',
    location: 'Seattle, WA',
    initials: 'SC',
    color: '#E7DDFB',
  },
  {
    id: '4',
    name: 'Noah Williams',
    role: 'Marketing Lead',
    department: 'Marketing',
    email: 'noah.williams@example.com',
    location: 'New York, NY',
    initials: 'NW',
    color: '#DDF1E6',
  },
];

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DirectoryProps = NativeStackScreenProps<RootStackParamList, 'Directory'>;
type DetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'EmployeeDetails'
>;

function HomeScreen({ navigation }: HomeProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.homeContent}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>A</Text>
          </View>
          <Text style={styles.brandName}>appnavi</Text>
          <View style={styles.onlineDot} />
        </View>

        <View style={styles.hero}>
          <Text style={styles.eyebrow}>YOUR PEOPLE, AT A GLANCE</Text>
          <Text style={styles.heroTitle}>Great work{"\n"}starts with{"\n"}people.</Text>
          <Text style={styles.heroDescription}>
            Get to know the people who make things happen.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Directory')}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>Explore the directory</Text>
            <Text style={styles.primaryButtonArrow}>→</Text>
          </Pressable>
        </View>

        <View style={styles.teamCard}>
          <View style={styles.teamCardHeader}>
            <View>
              <Text style={styles.cardEyebrow}>THE TEAM</Text>
              <Text style={styles.teamCount}>Meet your people</Text>
            </View>
            <Text style={styles.teamCardArrow}>↗</Text>
          </View>
          <View style={styles.avatarRow}>
            {employees.slice(0, 3).map((employee) => (
              <View
                key={employee.id}
                style={[
                  styles.avatar,
                  styles.smallAvatar,
                  { backgroundColor: employee.color },
                ]}
              >
                <Text style={styles.avatarInitials}>{employee.initials}</Text>
              </View>
            ))}
            <View style={[styles.avatar, styles.moreAvatar]}>
              <Text style={styles.moreAvatarText}>+1</Text>
            </View>
            <Text style={styles.teamCaption}>4 teammates</Text>
          </View>
        </View>
        <Text style={styles.footerNote}>A little more connected, every day.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function DirectoryScreen({ navigation }: DirectoryProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Text style={styles.eyebrow}>APPNAVI PEOPLE</Text>
        <Text style={styles.screenTitle}>The directory</Text>
        <Text style={styles.screenDescription}>
          Find a teammate and get to know what they do.
        </Text>

        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>ALL TEAMMATES</Text>
          <Text style={styles.listCount}>{employees.length} people</Text>
        </View>
        <View style={styles.employeeList}>
          {employees.map((employee) => (
            <Pressable
              key={employee.id}
              accessibilityRole="button"
              accessibilityLabel={`View ${employee.name}'s profile`}
              onPress={() =>
                navigation.navigate('EmployeeDetails', { employee })
              }
              style={({ pressed }) => [
                styles.employeeCard,
                pressed && styles.cardPressed,
              ]}
            >
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: employee.color },
                ]}
              >
                <Text style={styles.avatarInitials}>{employee.initials}</Text>
              </View>
              <View style={styles.employeeInfo}>
                <Text style={styles.employeeName}>{employee.name}</Text>
                <Text style={styles.employeeRole}>{employee.role}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.directoryHint}>Tap a teammate to view their profile.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function EmployeeDetailsScreen({ navigation, route }: DetailsProps) {
  const { employee } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back to the directory"
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backButtonText}>Back to directory</Text>
        </Pressable>

        <View style={styles.profile}>
          <View
            style={[
              styles.avatar,
              styles.profileAvatar,
              { backgroundColor: employee.color },
            ]}
          >
            <Text style={styles.profileInitials}>{employee.initials}</Text>
          </View>
          <Text style={styles.profileName}>{employee.name}</Text>
          <Text style={styles.profileRole}>{employee.role}</Text>
          <View style={styles.departmentPill}>
            <Text style={styles.departmentText}>{employee.department}</Text>
          </View>
        </View>

        <Text style={styles.listHeaderText}>ABOUT</Text>
        <View style={styles.detailCard}>
          <DetailRow label="EMAIL" value={employee.email} />
          <View style={styles.detailDivider} />
          <DetailRow label="LOCATION" value={employee.location} />
          <View style={styles.detailDivider} />
          <DetailRow label="DEPARTMENT" value={employee.department} />
        </View>
        <Text style={styles.profileNote}>
          Great teams are built one connection at a time.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F7F8FC' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Directory" component={DirectoryScreen} />
        <Stack.Screen
          name="EmployeeDetails"
          component={EmployeeDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },
  homeContent: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 12,
    paddingBottom: 28,
  },
  screenContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 36,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  brandMark: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: '#5B5CE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  brandName: {
    color: '#20213A',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#52B788',
    marginLeft: 'auto',
  },
  hero: {
    marginTop: 56,
  },
  eyebrow: {
    color: '#7779A0',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.7,
  },
  heroTitle: {
    color: '#20213A',
    fontSize: 48,
    lineHeight: 53,
    letterSpacing: -2.7,
    fontWeight: '800',
    marginTop: 17,
  },
  heroDescription: {
    maxWidth: 280,
    color: '#77798F',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 15,
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 17,
    backgroundColor: '#5B5CE2',
    marginTop: 27,
    paddingHorizontal: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  primaryButtonArrow: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '500',
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  teamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 19,
    marginTop: 42,
    borderWidth: 1,
    borderColor: '#ECECF4',
  },
  teamCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardEyebrow: {
    color: '#9A9BB0',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  teamCount: {
    color: '#292A42',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5,
  },
  teamCardArrow: {
    color: '#8586A1',
    fontSize: 19,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 19,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallAvatar: {
    width: 37,
    height: 37,
    borderRadius: 13,
    marginRight: -7,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarInitials: {
    color: '#34354E',
    fontSize: 14,
    fontWeight: '800',
  },
  moreAvatar: {
    width: 37,
    height: 37,
    borderRadius: 13,
    backgroundColor: '#F0F0F7',
    marginLeft: 1,
  },
  moreAvatarText: {
    color: '#74758C',
    fontSize: 11,
    fontWeight: '700',
  },
  teamCaption: {
    color: '#8B8CA1',
    fontSize: 12,
    marginLeft: 11,
  },
  footerNote: {
    color: '#A0A1B4',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 'auto',
    paddingTop: 32,
  },
  screenTitle: {
    color: '#20213A',
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: -1.5,
    fontWeight: '800',
    marginTop: 11,
  },
  screenDescription: {
    color: '#77798F',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 12,
  },
  listHeaderText: {
    color: '#9293A8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  listCount: {
    color: '#9293A8',
    fontSize: 11,
  },
  employeeList: {
    gap: 10,
  },
  employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEF4',
    borderRadius: 18,
    padding: 13,
  },
  cardPressed: {
    opacity: 0.72,
  },
  employeeInfo: {
    flex: 1,
    marginLeft: 13,
  },
  employeeName: {
    color: '#292A42',
    fontSize: 14,
    fontWeight: '700',
  },
  employeeRole: {
    color: '#8A8B9E',
    fontSize: 12,
    marginTop: 4,
  },
  chevron: {
    color: '#A4A5B8',
    fontSize: 25,
    marginLeft: 8,
    marginRight: 3,
  },
  directoryHint: {
    color: '#A0A1B4',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 22,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 12,
    marginBottom: 16,
  },
  backArrow: {
    color: '#5B5CE2',
    fontSize: 19,
    marginRight: 8,
  },
  backButtonText: {
    color: '#5B5CE2',
    fontSize: 13,
    fontWeight: '700',
  },
  profile: {
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 33,
  },
  profileAvatar: {
    width: 94,
    height: 94,
    borderRadius: 31,
  },
  profileInitials: {
    color: '#34354E',
    fontSize: 26,
    fontWeight: '800',
  },
  profileName: {
    color: '#20213A',
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.9,
    fontWeight: '800',
    marginTop: 17,
  },
  profileRole: {
    color: '#77798F',
    fontSize: 14,
    marginTop: 5,
  },
  departmentPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#EBEBFF',
    marginTop: 13,
  },
  departmentText: {
    color: '#5B5CE2',
    fontSize: 11,
    fontWeight: '700',
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECECF4',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginTop: 13,
  },
  detailRow: {
    paddingVertical: 15,
    gap: 6,
  },
  detailLabel: {
    color: '#9A9BB0',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  detailValue: {
    color: '#292A42',
    fontSize: 14,
    fontWeight: '600',
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#F0F0F5',
  },
  profileNote: {
    color: '#A0A1B4',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 25,
  },
});
