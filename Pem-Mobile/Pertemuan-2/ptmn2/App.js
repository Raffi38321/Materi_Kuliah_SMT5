import { StatusBar } from "expo-status-bar";
import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Linking,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from "react-native";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROFILE = {
  name: "Muhammad Raffi",
  title: "Backend Developer",
  email: "raffi38321@gmail.com",
  phone: "0859-7181-5705",
  location: "Cirebon, West Java",
  bio: "I enjoy working with modern technologies such as JavaScript, React, Node.js, Express, RESTful APIs, and AI-related tools and frameworks.",
  avatar: require("./assets/selena potrait.jpg"),
};

const SKILLS = [
  { id: "1", name: "ExpressJs", level: 90, color: "#844e4e" },
  { id: "2", name: "NestJs", level: 60, color: "#14e2ce" },
  { id: "3", name: "TypeScipt", level: 90, color: "#844e4e" },
  { id: "4", name: "NextJs", level: 80, color: "#45e111" },
  { id: "5", name: "MongoDB", level: 90, color: "#7863c5" },
  { id: "6", name: "React Native", level: 75, color: "#2b64ee" },
  { id: "7", name: "Docker", level: 90, color: "#7863c5" },
];

const SECTIONS = [
  {
    title: "💼 Pengalaman Kerja",
    data: [
      {
        id: "w1",
        role: "Backend Developer",
        company: "PT. Digital Nusantara",
        period: "2024 - Sekarang",
        desc: "Membangun API, integrasi database, dan optimasi performa sistem backend.",
      },
    ],
  },
  {
    title: "🎓️ Pendidikan",
    data: [
      {
        id: "e1",
        role: "S1 Informatika",
        company: "UIN SIBER SYEKH NURJATI CIREBON",
        period: "2024-2029",
        desc: "IPK 3.75 / 4.00 | Skripsi: Implementasi Machine Learning Pada Web.",
      },
      {
        id: "e2",
        role: "Mentee",
        company: "Asah Dicoding",
        period: "Juli 2025 - Desember 2025",
        desc: "React & Backend Development | Pengembangan aplikasi web menggunakan React dan Express.",
      },
      {
        id: "e3",
        role: "Mentee",
        company: "Coding Camp",
        period: "Maret 2026 - Juli 2026",
        desc: "Machine Learning | Pembelajaran dan pengembangan solusi AI menggunakan Python, TensorFlow, dan Machine Learning.",
      },
    ],
  },
];

const SOCIAL = [
  { id: "s1", label: "Github", icon: "🏅 ", url: "https://github.com/Raffi38321" },
  {
    id: "s2",
    label: "Linkedin",
    icon: "👜 ",
    url: "https://www.linkedin.com/in/muhammad-raffi-52658130a",
  },
  { id: "s3", label: "Youtube", icon: "▶️ ", url: "https://www.youtube.com" },
];

// Tab definitions
const TABS = [
  { key: "info", label: "Info" },
  { key: "skills", label: "Skills" },
  { key: "kontak", label: "Kontak" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}
  >
    <View style={styles.timelineDot} />
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
    </View>
  </TouchableOpacity>
);

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Tab navigasi state
  const [activeTab, setActiveTab] = useState("info");

  // Animated values untuk avatar (fade-in + scale)
  const avatarOpacity = useRef(new Animated.Value(0)).current;
  const avatarScale = useRef(new Animated.Value(0.6)).current;

  // Jalankan animasi saat komponen mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(avatarOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(avatarScale, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ── Helpers ──────────────────────────────────────────────────────────────

  const showAlert = (title, msg, buttons) => {
    if (Platform.OS === "web") {
      if (buttons && buttons.length > 1) {
        const confirmed = window.confirm(`${title}\n\n${msg}`);
        if (confirmed) {
          const confirmBtn = buttons.find((b) => b.text !== "Batal" && b.onPress);
          if (confirmBtn) confirmBtn.onPress();
        }
      } else {
        window.alert(`${title}\n\n${msg}`);
      }
    } else {
      Alert.alert(title, msg, buttons);
    }
  };

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      showAlert("Peringatan", "Nama dan pesan tidak boleh kosong");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSenderName("");
      setMessage("");
      showAlert("Berhasil", `Pesan dari ${senderName} telah terkirim`);
    }, 2000);
  };

  // ── Tab content renderers ─────────────────────────────────────────────────

  const renderInfoTab = () => (
    <View style={styles.sectionBox}>
      <Text style={styles.sectionTitle}>Riwayat</Text>
      <Text style={styles.sectionSubtitle}>
        SectionList: data dikelompokkan per kategori. Ketuk kartu untuk modal detail.
      </Text>
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TimelineCard item={item} onPress={handleCardPress} />
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );

  const renderSkillsTab = () => (
    <View style={styles.sectionBox}>
      <Text style={styles.sectionTitle}>Keahlian</Text>
      <Text style={styles.sectionSubtitle}>
        FlatList: menampilkan list data secara efisien
      </Text>
      <FlatList
        data={SKILLS}
        keyExtractor={(item) => `${item.id}-${item.name}`}
        renderItem={({ item }) => <SkillCard item={item} />}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );

  const renderKontakTab = () => (
    // ── [4] KeyboardAvoidingView: form tidak tertutup keyboard ──────────────
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 70}
    >
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Hubungi Saya</Text>
        <Text style={styles.sectionSubtitle}>
          TextInput, Button, ActivityIndicator, KeyboardAvoidingView
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Nama Anda"
          placeholderTextColor="#888"
          value={senderName}
          onChangeText={setSenderName}
          returnKeyType="next"
          editable={!sending}
        />

        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Tulis pesan Anda di sini..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          editable={!sending}
        />

        {sending ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="large" color="#7c3aed" />
            <Text style={styles.loadingText}>Mengirim pesan...</Text>
          </View>
        ) : (
          <Pressable style={styles.sendBtn} onPress={handleSend}>
            <Text style={styles.sendBtnText}>Kirim Pesan</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1a1a2e" barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📄  Curriculum Vitae</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? "🟢  Open" : "🔴  Busy"}
          </Text>
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{ false: "#555", true: "#4ade80" }}
            thumbColor={openToWork ? "#fff" : "#aaa"}
          />
        </View>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Profile section */}
        <View style={styles.profileSection}>
          {/* ── [6] Animated avatar: fade-in + spring scale ── */}
          <Animated.View
            style={{
              opacity: avatarOpacity,
              transform: [{ scale: avatarScale }],
            }}
          >
            <Image source={PROFILE.avatar} style={styles.avatar} />
          </Animated.View>

          {openToWork && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Open to Work</Text>
            </View>
          )}
          <Text style={styles.profileName}>{PROFILE.name}</Text>
          <Text style={styles.profileTitle}>{PROFILE.title}</Text>
          <Text style={styles.profileBio}>{PROFILE.bio}</Text>

          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{PROFILE.email}</Text>
            <Text style={styles.contactItem}>{PROFILE.location}</Text>
          </View>
          <Text style={styles.contactItem}>{PROFILE.phone}</Text>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            {SOCIAL.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.socialBtn}
                activeOpacity={0.7}
                onPress={() =>
                  showAlert(s.label, s.url, [
                    { text: "Batal", style: "cancel" },
                    { text: "Buka", onPress: () => Linking.openURL(s.url) },
                  ])
                }
              >
                <Text style={styles.socialIcon}>{s.icon}</Text>
                <Text style={styles.socialLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Download CV */}
          <Pressable
            style={({ pressed }) => [
              styles.downloadBtn,
              pressed && styles.downloadBtnPressed,
            ]}
            onPress={() =>
              showAlert("Download CV", "CV sedang diunduh...", [{ text: "OK" }])
            }
          >
            {({ pressed }) => (
              <Text style={styles.downloadBtnText}>
                {pressed ? "Mengunduh..." : "⬇  Download CV (PDF)"}
              </Text>
            )}
          </Pressable>
        </View>

        {/* ── [5] Tab Navigasi ─────────────────────────────────────────────── */}
        <View style={styles.tabBar}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabBtn,
                activeTab === tab.key && styles.tabBtnActive,
              ]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.key && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab content */}
        <View style={{ marginBottom: 32 }}>
          {activeTab === "info" && renderInfoTab()}
          {activeTab === "skills" && renderSkillsTab()}
          {activeTab === "kontak" && renderKontakTab()}
        </View>
      </ScrollView>

      {/* Modal detail timeline */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>{selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ─── Colors & Styles ──────────────────────────────────────────────────────────

const COLORS = {
  bg: "#0f0f1a",
  header: "#1a1a2e",
  card: "#111827",
  cardBorder: "#2d2d44",
  accent: "#7c3aed",
  accentLight: "#a78bfa",
  accentGold: "#f59e0b",
  text: "#f0f0f0",
  textMuted: "#9ca3af",
  textDim: "#6b7280",
  success: "#4ade80",
  white: "#ffffff",
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { flex: 1 },

  // Header
  headerBar: {
    backgroundColor: COLORS.header,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  switchRow: { flexDirection: "row", alignItems: "center" },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "600",
    marginRight: 8,
  },

  // Profile
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 0,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#052e16",
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: { color: COLORS.success, fontSize: 12, fontWeight: "700" },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 14,
    textAlign: "center",
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: "center",
    marginHorizontal: 4,
  },
  socialRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  socialBtn: {
    alignItems: "center",
    backgroundColor: "#16213e",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginHorizontal: 6,
    marginBottom: 8,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: { color: COLORS.accentLight, fontSize: 11, fontWeight: "600" },
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: { backgroundColor: "#5b21b6" },
  downloadBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },

  // ── [5] Tab Bar ────────────────────────────────────────────────────────────
  tabBar: {
    flexDirection: "row",
    backgroundColor: COLORS.header,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  tabLabel: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  tabLabelActive: {
    color: COLORS.white,
    fontWeight: "700",
  },

  // Section boxes
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 16,
  },
  sectionHeader: {
    backgroundColor: "#0f172a",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: "700",
    fontSize: 13,
  },

  // Skills
  skillCard: {
    backgroundColor: "#16213e",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  skillName: { color: COLORS.text, fontWeight: "600", fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: "700", fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: "#0f172a",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: 6, borderRadius: 4 },

  // Timeline
  timelineCard: {
    flexDirection: "row",
    backgroundColor: "#16213e",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  timelineCompany: {
    color: COLORS.accentLight,
    fontSize: 13,
    marginBottom: 2,
  },
  timelinePeriod: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  timelineHint: {
    color: COLORS.accentGold,
    fontSize: 11,
    fontStyle: "italic",
  },

  // Form / Kontak
  textInput: {
    backgroundColor: "#0f172a",
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  sendBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  sendBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 12,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: "#1e1b4b",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 4,
  },
  modalCompany: {
    color: COLORS.accentLight,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  modalPeriod: { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
  modalDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginBottom: 16,
  },
  modalDesc: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },
});
