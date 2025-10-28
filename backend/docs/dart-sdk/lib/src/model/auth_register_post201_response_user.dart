//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'auth_register_post201_response_user.g.dart';

/// AuthRegisterPost201ResponseUser
///
/// Properties:
/// * [id] 
/// * [email] 
/// * [role] 
@BuiltValue()
abstract class AuthRegisterPost201ResponseUser implements Built<AuthRegisterPost201ResponseUser, AuthRegisterPost201ResponseUserBuilder> {
  @BuiltValueField(wireName: r'id')
  String? get id;

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'role')
  AuthRegisterPost201ResponseUserRoleEnum? get role;
  // enum roleEnum {  ADMIN,  DRIVER,  RIDER,  };

  AuthRegisterPost201ResponseUser._();

  factory AuthRegisterPost201ResponseUser([void updates(AuthRegisterPost201ResponseUserBuilder b)]) = _$AuthRegisterPost201ResponseUser;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthRegisterPost201ResponseUserBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthRegisterPost201ResponseUser> get serializer => _$AuthRegisterPost201ResponseUserSerializer();
}

class _$AuthRegisterPost201ResponseUserSerializer implements PrimitiveSerializer<AuthRegisterPost201ResponseUser> {
  @override
  final Iterable<Type> types = const [AuthRegisterPost201ResponseUser, _$AuthRegisterPost201ResponseUser];

  @override
  final String wireName = r'AuthRegisterPost201ResponseUser';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthRegisterPost201ResponseUser object, {
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
        specifiedType: const FullType(AuthRegisterPost201ResponseUserRoleEnum),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthRegisterPost201ResponseUser object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AuthRegisterPost201ResponseUserBuilder result,
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
            specifiedType: const FullType(AuthRegisterPost201ResponseUserRoleEnum),
          ) as AuthRegisterPost201ResponseUserRoleEnum;
          result.role = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthRegisterPost201ResponseUser deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthRegisterPost201ResponseUserBuilder();
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

class AuthRegisterPost201ResponseUserRoleEnum extends EnumClass {

  @BuiltValueEnumConst(wireName: r'ADMIN')
  static const AuthRegisterPost201ResponseUserRoleEnum ADMIN = _$authRegisterPost201ResponseUserRoleEnum_ADMIN;
  @BuiltValueEnumConst(wireName: r'DRIVER')
  static const AuthRegisterPost201ResponseUserRoleEnum DRIVER = _$authRegisterPost201ResponseUserRoleEnum_DRIVER;
  @BuiltValueEnumConst(wireName: r'RIDER')
  static const AuthRegisterPost201ResponseUserRoleEnum RIDER = _$authRegisterPost201ResponseUserRoleEnum_RIDER;

  static Serializer<AuthRegisterPost201ResponseUserRoleEnum> get serializer => _$authRegisterPost201ResponseUserRoleEnumSerializer;

  const AuthRegisterPost201ResponseUserRoleEnum._(String name): super(name);

  static BuiltSet<AuthRegisterPost201ResponseUserRoleEnum> get values => _$authRegisterPost201ResponseUserRoleEnumValues;
  static AuthRegisterPost201ResponseUserRoleEnum valueOf(String name) => _$authRegisterPost201ResponseUserRoleEnumValueOf(name);
}

