//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_me200_response_user.g.dart';

/// AuthMe200ResponseUser
///
/// Properties:
/// * [id] 
/// * [email] 
/// * [role] 
/// * [firstName] 
/// * [lastName] 
@BuiltValue()
abstract class AuthMe200ResponseUser implements Built<AuthMe200ResponseUser, AuthMe200ResponseUserBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'role')
  AuthMe200ResponseUserRoleEnum? get role;
  // enum roleEnum {  ADMIN,  DRIVER,  RIDER,  };

  @BuiltValueField(wireName: r'firstName')
  String? get firstName;

  @BuiltValueField(wireName: r'lastName')
  String? get lastName;

  AuthMe200ResponseUser._();

  factory AuthMe200ResponseUser([void updates(AuthMe200ResponseUserBuilder b)]) = _$AuthMe200ResponseUser;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthMe200ResponseUserBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthMe200ResponseUser> get serializer => _$AuthMe200ResponseUserSerializer();
}

class _$AuthMe200ResponseUserSerializer implements PrimitiveSerializer<AuthMe200ResponseUser> {
  @override
  final Iterable<Type> types = const [AuthMe200ResponseUser, _$AuthMe200ResponseUser];

  @override
  final String wireName = r'AuthMe200ResponseUser';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthMe200ResponseUser object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.id != null) {
      yield r'id';
      yield serializers.serialize(
        object.id,
        specifiedType: const FullType(String),
      );
    }
    if (object.email != null) {
      yield r'email';
      yield serializers.serialize(
        object.email,
        specifiedType: const FullType(String),
      );
    }
    if (object.role != null) {
      yield r'role';
      yield serializers.serialize(
        object.role,
        specifiedType: const FullType(AuthMe200ResponseUserRoleEnum),
      );
    }
    if (object.firstName != null) {
      yield r'firstName';
      yield serializers.serialize(
        object.firstName,
        specifiedType: const FullType(String),
      );
    }
    if (object.lastName != null) {
      yield r'lastName';
      yield serializers.serialize(
        object.lastName,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthMe200ResponseUser object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthMe200ResponseUserBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        case r'role':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AuthMe200ResponseUserRoleEnum),
          ) as AuthMe200ResponseUserRoleEnum;
          result.role = valueDes;
          break;
        case r'firstName':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.firstName = valueDes;
          break;
        case r'lastName':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.lastName = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthMe200ResponseUser deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthMe200ResponseUserBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class AuthMe200ResponseUserRoleEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ADMIN')
  static const AuthMe200ResponseUserRoleEnum ADMIN = _$authMe200ResponseUserRoleEnum_ADMIN;
  @BuiltValueEnumConst(wireName: r'DRIVER')
  static const AuthMe200ResponseUserRoleEnum DRIVER = _$authMe200ResponseUserRoleEnum_DRIVER;
  @BuiltValueEnumConst(wireName: r'RIDER')
  static const AuthMe200ResponseUserRoleEnum RIDER = _$authMe200ResponseUserRoleEnum_RIDER;

  static Serializer<AuthMe200ResponseUserRoleEnum> get serializer => _$authMe200ResponseUserRoleEnumSerializer;

  const AuthMe200ResponseUserRoleEnum._(String name): super(name);

  static BuiltSet<AuthMe200ResponseUserRoleEnum> get values => _$authMe200ResponseUserRoleEnumValues;
  static AuthMe200ResponseUserRoleEnum valueOf(String name) => _$authMe200ResponseUserRoleEnumValueOf(name);
}

