import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useProductForm } from "../../hooks/useProductForm";
import { useTranslation } from "../../hooks/useTranslation";
export default function EditScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {
    savedItems,
    updateItem,
    carType,
    conditionOptions,
    partOptions,
    loadSavedItems,
  } = useProductForm(); // Added loadSavedItems

  const [name, setName] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedPart, setSelectedPart] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageSourceModalVisible, setImageSourceModalVisible] = useState(false);
  const [item, setItem] = useState<any>(null); // Added item state

  // Load item data when component mounts
  useEffect(() => {
    const loadItemData = async () => {
      setLoading(true);

      // Ensure we have fresh data from database
      await loadSavedItems();

      // Convert id to number for SQLite comparison
      const numericId = parseInt(id as string, 10);
      console.log("Edit Screen - Looking for item ID:", numericId);

      // Find the item - SQLite uses numeric IDs
      const foundItem = savedItems.find((i) => i.id === numericId);
      console.log("Edit Screen - Found item:", foundItem);

      if (foundItem) {
        setItem(foundItem);
        setName(foundItem.name || "");
        setSelectedSize(foundItem.size || "");
        setSelectedCondition(foundItem.condition || "");
        setSelectedPart(foundItem.part || "");
        setDescription(foundItem.description || "");
        setPrice(foundItem.price || "");

        // Handle both old (imageUri) and new (imageUris) data formats
        if (foundItem.imageUris) {
          setSelectedImages(foundItem.imageUris);
        } else if (foundItem.imageUri) {
          setSelectedImages([foundItem.imageUri]);
        } else {
          setSelectedImages([]);
        }
      }
      setLoading(false);
    };

    if (id) {
      loadItemData();
    }
  }, [id, savedItems.length]); // Added dependency

  const pickImages = async () => {
    setImageSourceModalVisible(false);

    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: 0,
      orderedSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setSelectedImages((prev) => [...prev, ...uris]);
    }
  };

  const takePhoto = async () => {
    setImageSourceModalVisible(false);

    // Request permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      setSelectedImages((prev) => [...prev, newImageUri]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }

    // Convert id to number for SQLite
    const numericId = parseInt(id as string, 10);

    const updatedData = {
      name,
      size: selectedSize,
      condition: selectedCondition,
      part: selectedPart,
      description,
      price,
      imageUris: selectedImages,
    };

    const success = await updateItem(numericId.toString(), updatedData); // Keep as string for the function
    if (success) {
      Alert.alert("Success", "Item updated successfully!");
      router.back();
    } else {
      Alert.alert("Error", "Failed to update item");
    }
  };

  const renderDropdown = (
    selectedValue: string,
    onSelect: (value: string) => void,
    options: string[],
    placeholder: string
  ) => (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{placeholder}:</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedValue === option && styles.selectedOption,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text
              style={
                selectedValue === option
                  ? styles.selectedText
                  : styles.optionText
              }
            >
              {t(option as any)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Loading item...</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t("itemNotFound")}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1, backgroundColor: '#0A1931' }} // ← SET SAME BACKGROUND COLOR
    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 90}
  >
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("edit")}</Text>

        {/* Debug Info - Remove this after testing */}
        {/* <View style={styles.debugInfo}>
          <Text style={styles.debugText}>Editing Item ID: {id}</Text>
          <Text style={styles.debugText}>Found: {item ? 'Yes' : 'No'}</Text>
        </View> */}

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("name")} *</Text>
          <TextInput
            style={[styles.textInput, !name.trim() && styles.errorInput]}
            value={name}
            onChangeText={setName}
            placeholder={t('itemName')}
            placeholderTextColor="#CCCCCC"
          />
        </View>

        {/* Updated Image Section with Multiple Images */}
        <View style={styles.imageSection}>
          <Text style={styles.label}>{t("images")}:</Text>

          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => setImageSourceModalVisible(true)}
          >
            <Text style={styles.buttonText}>
              {selectedImages.length > 0 ? "Add More Images" : "Add Images"}
            </Text>
          </TouchableOpacity>

          {/* Image Source Selection Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={imageSourceModalVisible}
            onRequestClose={() => setImageSourceModalVisible(false)}
          >
            <TouchableWithoutFeedback
              onPressOut={() => setImageSourceModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    {t("checkImageStorage")}
                  </Text>

                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={pickImages}
                  >
                    <Text style={styles.modalButtonText}>
                      {t("chooseFromGallery")}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={takePhoto}
                  >
                    <Text style={styles.modalButtonText}>{t("takePhoto")}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cancelModalButton}
                    onPress={() => setImageSourceModalVisible(false)}
                  >
                    <Text style={styles.cancelModalButtonText}>
                      {t("cancel")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          {/* Display Selected Images */}
          {selectedImages.length > 0 && (
            <View>
              <Text style={styles.imageCountText}>
                {selectedImages.length}{" "}
                {selectedImages.length === 1 ? "image" : "images"} selected
              </Text>
              <ScrollView horizontal style={styles.multipleImageContainer}>
                {selectedImages.map((imageUri, index) => (
                  <View key={index} style={styles.imagePreviewContainer}>
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.imagePreview}
                    />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <Text style={styles.removeImageText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Dropdowns */}
        {renderDropdown(
          selectedSize,
          setSelectedSize,
          carType,
          t("selectCarType")
        )}
        {renderDropdown(
          selectedCondition,
          setSelectedCondition,
          conditionOptions,
          t("selectCondition")
        )}
        {renderDropdown(
          selectedPart,
          setSelectedPart,
          partOptions,
          t("selectPart")
        )}

        {/* Description Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("description")}:</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder={t("enterDescription")}
            placeholderTextColor="#CCCCCC"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Price Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("price")}:</Text>
          <TextInput
            style={styles.textInput}
            value={price}
            onChangeText={setPrice}
            placeholder={t('enterPrice')}
            placeholderTextColor="#CCCCCC"
            keyboardType="numeric"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>{t("cancel")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.updateButton]}
            onPress={handleUpdate}
          >
            <Text style={styles.buttonText}>{t("update")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  debugInfo: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  debugText: {
    fontSize: 12,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#0A1931",
  },
  container: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0A1931",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#FFD700",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FFD700",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#FFD700",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#2d3e5d",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#1a2b4d",
    color: "#FFFFFF",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: "#ff4444",
  },
  imageSection: {
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: "#1a2b4d",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2d3e5d",
  },
  multipleImageContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  imagePreviewContainer: {
    position: "relative",
    marginRight: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2d3e5d",
  },
  removeImageButton: {
    position: "absolute",
    top: 1,
    right: 1,
    backgroundColor: "#ff4444",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  removeImageText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    // marginBottom:2
  },
  imageCountText: {
    fontSize: 12,
    color: "#CCCCCC",
    marginTop: 5,
    textAlign: "center",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1a2b4d",
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#2d3e5d",
  },
  selectedOption: {
    backgroundColor: "#FFD700",
    borderColor: "#FFD700",
  },
  optionText: {
    color: "#CCCCCC",
  },
  selectedText: {
    color: "#0A1931",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBlock: 30,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#1a2b4d",
    borderWidth: 1,
    borderColor: "#ff6b6b",
  },
  updateButton: {
    backgroundColor: "#1a2b4d",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  buttonText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    backgroundColor: "#1a2b4d",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFD700",
  },
  modalButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#2d3e5d",
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3d4e6d",
  },
  modalButtonText: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "600",
  },
  cancelModalButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#2d3e5d",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ff6b6b",
  },
  cancelModalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff6b6b",
  },
});
