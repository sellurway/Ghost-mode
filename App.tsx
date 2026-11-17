import React, { useEffect, useMemo, useState } from "react";
import { Alert, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const durations = [15, 30, 45, 60];
const scenes = [
  { eyebrow: "OCEAN DRIVE  /  01", title: "THE CITY\nIS YOURS", sub: "Disappear from the noise.", color: "#160D2B", accent: "#FF5EC4" },
  { eyebrow: "AFTER HOURS  /  02", title: "NO ONE\nCAN REACH YOU", sub: "Take back your time.", color: "#210D2B", accent: "#FF8A5B" },
  { eyebrow: "NEON COAST  /  03", title: "JUST YOU.\nNO DISTRACTIONS.", sub: "Stay in your own world.", color: "#10152D", accent: "#65E6FF" },
];

export default function App() {
  const [duration, setDuration] = useState(30);
  const [remaining, setRemaining] = useState(0);
  const [active, setActive] = useState(false);
  const [scene, setScene] = useState(0);
  const [pin, setPin] = useState("");
  const [pinModal, setPinModal] = useState(false);
  const [pinEntry, setPinEntry] = useState("");
  const [pinPurpose, setPinPurpose] = useState<"create" | "exit">("create");
  const [draftPin, setDraftPin] = useState("");

  useEffect(() => {
    if (!active) return;
    const timer = setInterval(() => setRemaining(value => {
      if (value <= 1) { setActive(false); return 0; }
      return value - 1;
    }), 1000);
    const artwork = setInterval(() => setScene(value => (value + 1) % scenes.length), 9000);
    return () => { clearInterval(timer); clearInterval(artwork); };
  }, [active]);

  const clock = useMemo(() => {
    const mins = Math.floor(remaining / 60).toString().padStart(2, "0");
    const secs = (remaining % 60).toString().padStart(2, "0");
    return mins + ":" + secs;
  }, [remaining]);

  const beginPinSetup = () => {
    setPinPurpose("create"); setPinEntry(""); setDraftPin(""); setPinModal(true);
  };
  const beginExit = () => {
    if (!pin) { setActive(false); setRemaining(0); return; }
    setPinPurpose("exit"); setPinEntry(""); setPinModal(true);
  };
  const confirmPin = () => {
    if (pinPurpose === "create") {
      if (draftPin.length !== 4) { Alert.alert("Choose a 4-digit vault PIN"); return; }
      if (pinEntry !== draftPin) { Alert.alert("PINs don't match", "Enter the same 4 digits twice."); setPinEntry(""); return; }
      setPin(draftPin); setPinModal(false); Alert.alert("Vault secured", "Your GHOST MODE exit PIN has been set.");
    } else {
      if (pinEntry === pin) { setPinModal(false); setActive(false); setRemaining(0); }
      else { Alert.alert("Incorrect PIN", "Try again."); setPinEntry(""); }
    }
  };
  const startSession = () => {
    if (!pin) { beginPinSetup(); return; }
    setRemaining(duration * 60); setScene(0); setActive(true);
  };

  if (active) {
    const current = scenes[scene];
    return (
      <SafeAreaView style={[styles.fullScreen, { backgroundColor: current.color }]}>
        <StatusBar hidden />
        <View style={styles.sceneTop}><Text style={[styles.eyebrow, { color: current.accent }]}>{current.eyebrow}</Text><Text style={styles.timer}>{clock}</Text></View>
        <View style={styles.sceneCenter}>
          <View style={[styles.orb, { borderColor: current.accent }]}><View style={[styles.orbCore, { backgroundColor: current.accent }]} /><View style={styles.orbHorizon}/></View>
          <Text style={styles.sceneTitle}>{current.title}</Text>
          <Text style={styles.sceneSub}>{current.sub}</Text>
        </View>
        <View style={styles.sceneBottom}>
          <Text style={styles.sessionLabel}>GHOST SESSION ACTIVE</Text>
          <TouchableOpacity style={styles.exitButton} onPress={beginExit}><Text style={styles.exitText}>OPEN VAULT  ·  EXIT</Text></TouchableOpacity>
          <Text style={styles.disclaimer}>Keep GHOST MODE open to view your session screens.</Text>
        </View>
        <Modal transparent visible={pinModal} animationType="fade" onRequestClose={() => setPinModal(false)}>
          <View style={styles.modalShade}><View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{pinPurpose === "create" ? "CREATE YOUR VAULT PIN" : "UNLOCK THE VAULT"}</Text>
            <Text style={styles.modalHint}>{pinPurpose === "create" ? "Choose a 4-digit PIN, then enter it again." : "Enter your 4-digit GHOST MODE PIN to end this session."}</Text>
            {pinPurpose === "create" && <TextInput value={draftPin} onChangeText={v => setDraftPin(v.replace(/\D/g, "").slice(0,4))} keyboardType="number-pad" secureTextEntry placeholder="Create PIN" placeholderTextColor="#777" style={styles.pinInput} />}
            <TextInput value={pinEntry} onChangeText={v => setPinEntry(v.replace(/\D/g, "").slice(0,4))} keyboardType="number-pad" secureTextEntry placeholder={pinPurpose === "create" ? "Confirm PIN" : "Enter PIN"} placeholderTextColor="#777" style={styles.pinInput} />
            <TouchableOpacity style={styles.primaryButton} onPress={confirmPin}><Text style={styles.primaryButtonText}>CONFIRM</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setPinModal(false)}><Text style={styles.cancelText}>CANCEL</Text></TouchableOpacity>
          </View></View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#08090D" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View><Text style={styles.brand}>GHOST<Text style={styles.brandAccent}> MODE</Text></Text><Text style={styles.tagline}>YOUR WORLD. YOUR RULES.</Text></View>
          <View style={styles.status}><View style={styles.statusDot}/><Text style={styles.statusText}>READY</Text></View>
        </View>
        <View style={styles.hero}>
          <View pointerEvents="none" style={styles.sunGlow}><View style={styles.sunCutOne}/><View style={styles.sunCutTwo}/><View style={styles.sunCutThree}/></View>
          <Text style={styles.cityLabel}>MIAMI  •  1986</Text>
          <Text style={styles.heroKicker}>DISCONNECT TO RECONNECT</Text>
          <Text style={styles.heroTitle}>MAKE THE{ "\n" }WORLD WAIT.</Text>
          <Text style={styles.heroCopy}>Set your time. Enter your zone. Leave the noise outside.</Text>
          <View style={styles.heroLine}/>
          <Text style={styles.heroFoot}>GHOST MODE  /  SESSION CONTROL</Text>
        </View>
        <Text style={styles.sectionTitle}>01  /  CHOOSE YOUR SESSION</Text>
        <Text style={styles.sectionCopy}>How long do you want your world to go quiet?</Text>
        <View style={styles.durationRow}>{durations.map(item => <TouchableOpacity key={item} onPress={() => setDuration(item)} style={[styles.duration, duration === item && styles.durationSelected]}><Text style={[styles.durationNumber, duration === item && styles.durationNumberSelected]}>{item}</Text><Text style={[styles.durationUnit, duration === item && styles.durationNumberSelected]}>MIN</Text></TouchableOpacity>)}</View>
        <View style={styles.vaultCard}>
          <View style={styles.vaultIcon}><Text style={styles.lockIcon}>⌑</Text></View>
          <View style={styles.vaultText}><Text style={styles.vaultTitle}>YOUR PRIVATE VAULT</Text><Text style={styles.vaultCopy}>{pin ? "A 4-digit exit PIN is set." : "Set a 4-digit PIN before your first session."}</Text></View>
          <TouchableOpacity onPress={beginPinSetup}><Text style={styles.editText}>{pin ? "EDIT" : "SET UP"}</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={startSession}><Text style={styles.startButtonText}>ENTER GHOST MODE</Text><Text style={styles.startArrow}>↗</Text></TouchableOpacity>
        <View style={styles.note}><Text style={styles.noteTitle}>A NOTE ABOUT YOUR PHONE</Text><Text style={styles.noteCopy}>This first build keeps you inside the GHOST MODE app and rotates original in-app screens. It does not yet silence system notifications, block other apps, control Airplane Mode, or handle carrier calls. Those features depend on Android permissions, device support and carrier services.</Text></View>
        <Text style={styles.footer}>GHOST MODE  ·  EARLY BUILD 01</Text>
      </ScrollView>
      <Modal transparent visible={pinModal} animationType="fade" onRequestClose={() => setPinModal(false)}>
        <View style={styles.modalShade}><View style={styles.modalCard}>
          <Text style={styles.modalTitle}>CREATE YOUR VAULT PIN</Text><Text style={styles.modalHint}>Choose a 4-digit PIN, then enter it again.</Text>
          <TextInput value={draftPin} onChangeText={v => setDraftPin(v.replace(/\D/g, "").slice(0,4))} keyboardType="number-pad" secureTextEntry placeholder="Create PIN" placeholderTextColor="#777" style={styles.pinInput}/>
          <TextInput value={pinEntry} onChangeText={v => setPinEntry(v.replace(/\D/g, "").slice(0,4))} keyboardType="number-pad" secureTextEntry placeholder="Confirm PIN" placeholderTextColor="#777" style={styles.pinInput}/>
          <TouchableOpacity style={styles.primaryButton} onPress={confirmPin}><Text style={styles.primaryButtonText}>SAVE VAULT PIN</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setPinModal(false)}><Text style={styles.cancelText}>CANCEL</Text></TouchableOpacity>
        </View></View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:"#10091D"},
  content:{padding:24,paddingBottom:42},
  header:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:12,marginBottom:27},
  brand:{color:"#FFF4FB",fontSize:24,fontWeight:"900",letterSpacing:2.5},
  brandAccent:{color:"#FF5EC4"},
  tagline:{color:"#A995B9",fontSize:9,letterSpacing:2.2,marginTop:5},
  status:{flexDirection:"row",alignItems:"center",borderWidth:1,borderColor:"#563052",borderRadius:30,paddingHorizontal:12,paddingVertical:8,backgroundColor:"#21122D"},
  statusDot:{width:6,height:6,borderRadius:4,backgroundColor:"#65F0C1",marginRight:7},
  statusText:{color:"#F1BCE4",fontSize:9,letterSpacing:1.5},
  hero:{backgroundColor:"#21102F",borderWidth:1,borderColor:"#71345F",borderRadius:20,padding:23,minHeight:300,justifyContent:"center",marginBottom:34,overflow:"hidden",shadowColor:"#FF38B8",shadowOpacity:0.22,shadowRadius:22,elevation:8},
  sunGlow:{position:"absolute",width:218,height:218,borderRadius:120,backgroundColor:"#FF5A9E",right:-55,top:22,opacity:0.92,overflow:"hidden",justifyContent:"flex-end",alignItems:"center"},
  sunCutOne:{height:7,width:"100%",backgroundColor:"#FF9C73",marginBottom:13},
  sunCutTwo:{height:5,width:"100%",backgroundColor:"#FF9C73",marginBottom:12},
  sunCutThree:{height:4,width:"100%",backgroundColor:"#FF9C73",marginBottom:10},
  cityLabel:{color:"#FFD5F1",fontSize:8,fontWeight:"900",letterSpacing:3,marginBottom:17},
  heroKicker:{color:"#FF8BD7",fontSize:9,letterSpacing:2.5,marginBottom:17,fontWeight:"800"},
  heroTitle:{color:"#FFF5FB",fontSize:39,fontWeight:"900",letterSpacing:-1.5,lineHeight:42,textShadowColor:"#FF4DBD",textShadowOffset:{width:0,height:0},textShadowRadius:12},
  heroCopy:{color:"#D1B7D2",fontSize:13,lineHeight:20,marginTop:13,maxWidth:260},
  heroLine:{height:1,backgroundColor:"#75416F",marginTop:25,marginBottom:12,width:"75%"},
  heroFoot:{color:"#B58EBC",fontSize:8,letterSpacing:1.8},
  sectionTitle:{color:"#FFE9F8",fontSize:11,fontWeight:"900",letterSpacing:1.7},
  sectionCopy:{color:"#B29BB8",fontSize:12,marginTop:8,marginBottom:17},
  durationRow:{flexDirection:"row",gap:9,marginBottom:23},
  duration:{flex:1,backgroundColor:"#1B1027",borderWidth:1,borderColor:"#49304F",borderRadius:12,paddingVertical:16,alignItems:"center"},
  durationSelected:{backgroundColor:"#4A1D49",borderColor:"#FF68C8",shadowColor:"#FF5EC4",shadowOpacity:0.3,shadowRadius:10,elevation:4},
  durationNumber:{color:"#D2BED8",fontSize:21,fontWeight:"800"},
  durationNumberSelected:{color:"#FFFFFF"},
  durationUnit:{color:"#9B82A4",fontSize:8,letterSpacing:1.5,marginTop:3},
  vaultCard:{flexDirection:"row",alignItems:"center",backgroundColor:"#1B1027",borderColor:"#49304F",borderWidth:1,borderRadius:13,padding:14,marginBottom:16},
  vaultIcon:{width:38,height:38,borderRadius:10,backgroundColor:"#472044",alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#B84D9A"},
  lockIcon:{fontSize:22,color:"#FF8BD7"},
  vaultText:{flex:1,marginLeft:12},
  vaultTitle:{color:"#FFE9F8",fontSize:10,fontWeight:"900",letterSpacing:1},
  vaultCopy:{color:"#B29BB8",fontSize:10,marginTop:5},
  editText:{color:"#FF82D4",fontSize:9,fontWeight:"900",letterSpacing:1},
  startButton:{backgroundColor:"#FF62BD",borderRadius:12,padding:18,flexDirection:"row",justifyContent:"center",alignItems:"center",shadowColor:"#FF43B4",shadowOpacity:0.35,shadowRadius:14,elevation:5},
  startButtonText:{color:"#250D2C",fontSize:12,fontWeight:"900",letterSpacing:1.5},
  startArrow:{color:"#250D2C",fontSize:18,position:"absolute",right:18},
  note:{borderLeftWidth:2,borderLeftColor:"#FF68C8",paddingLeft:13,marginTop:26},
  noteTitle:{color:"#FF8BD7",fontSize:9,fontWeight:"900",letterSpacing:1.5,marginBottom:7},
  noteCopy:{color:"#A990B1",fontSize:10,lineHeight:17},
  footer:{color:"#705779",fontSize:8,letterSpacing:2,textAlign:"center",marginTop:30},
  fullScreen:{flex:1,padding:25,justifyContent:"space-between"},
  sceneTop:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:20},
  eyebrow:{fontSize:9,letterSpacing:2,fontWeight:"900"},
  timer:{color:"#FFF4FB",fontSize:16,fontWeight:"800",letterSpacing:2},
  sceneCenter:{alignItems:"center",justifyContent:"center",flex:1},
  orb:{width:190,height:190,borderWidth:1.5,borderRadius:100,opacity:0.95,marginBottom:42,alignItems:"center",justifyContent:"center",overflow:"hidden",backgroundColor:"#FF5EC41A",shadowColor:"#FF5EC4",shadowOpacity:0.4,shadowRadius:24,elevation:8},
  orbCore:{width:130,height:130,borderRadius:70,opacity:0.16},
  orbHorizon:{position:"absolute",height:2,width:190,backgroundColor:"#FFFFFF88",top:95},
  sceneTitle:{color:"#FFF5FB",fontSize:40,fontWeight:"900",letterSpacing:-1.5,textAlign:"center",lineHeight:43,textShadowColor:"#FF4DBD",textShadowOffset:{width:0,height:0},textShadowRadius:13},
  sceneSub:{color:"#E0C3DD",fontSize:12,letterSpacing:1,marginTop:18},
  sceneBottom:{alignItems:"center",marginBottom:15},
  sessionLabel:{color:"#F7C8EA",fontSize:9,letterSpacing:2,marginBottom:16},
  exitButton:{borderWidth:1,borderColor:"#FF8BD7",backgroundColor:"#31152F",paddingVertical:14,paddingHorizontal:25,borderRadius:30},
  exitText:{color:"#FFF5FB",fontSize:9,fontWeight:"900",letterSpacing:1.7},
  disclaimer:{color:"#D2B4D2",fontSize:9,marginTop:14},
  modalShade:{flex:1,backgroundColor:"#08030DEB",justifyContent:"center",padding:24},
  modalCard:{backgroundColor:"#21102F",borderWidth:1,borderColor:"#B84D9A",borderRadius:18,padding:23,shadowColor:"#FF43B4",shadowOpacity:0.28,shadowRadius:20,elevation:10},
  modalTitle:{color:"#FFF5FB",fontSize:14,fontWeight:"900",letterSpacing:1.3},
  modalHint:{color:"#C5A9C9",fontSize:11,lineHeight:17,marginTop:9,marginBottom:17},
  pinInput:{backgroundColor:"#120A1D",borderWidth:1,borderColor:"#71416E",borderRadius:10,color:"#FFFFFF",padding:14,marginBottom:10,fontSize:18,letterSpacing:8,textAlign:"center"},
  primaryButton:{backgroundColor:"#FF62BD",borderRadius:10,padding:15,alignItems:"center",marginTop:5,marginBottom:16},
  primaryButtonText:{color:"#250D2C",fontSize:10,fontWeight:"900",letterSpacing:1.5},
  cancelText:{color:"#D3B3D4",fontSize:10,textAlign:"center",letterSpacing:1.5}
});
